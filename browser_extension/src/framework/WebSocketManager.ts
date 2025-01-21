import { CONFIG } from "../models/Config";
import { LogLevel } from "../models/LogLevel";
import { WebSocketMessageQueue } from "./WebSocketMessageQueue";
import { StorageConfig } from "../models/StorageConfig";
import { ServerResponse } from "../models/ServerResponse";
import { WebSocketMessage } from "../models/WebSocketMessage";

export class WebSocketManager {
  private socket: WebSocket | null = null;
  private retryCount = 0;
  private messageQueue: WebSocketMessageQueue;
  private config: StorageConfig;

  constructor(
    private readonly backendUrl: string = process.env.REACT_APP_BACKEND_URL ??
      (() => {
        throw new Error("Backend URL is required");
      })()
  ) {
    this.messageQueue = new WebSocketMessageQueue();
    this.config = {
      Id: "",
      apiKey: "",
      preferredLLM: CONFIG.defaultLLM,
    };
  }

  private log(level: LogLevel, message: string, data?: unknown): void {
    const timestamp = new Date().toISOString();

    (console as any)[LogLevel[level].toLowerCase()](
      `[${timestamp}] ${message}`,
      data
    );
  }

  private getRetryDelay(): number {
    return Math.min(
      CONFIG.baseRetryInterval * Math.pow(2, this.retryCount),
      CONFIG.maxRetryDelay
    );
  }

  private async sendNotification(
    title: string,
    message: string
  ): Promise<void> {
    await chrome.notifications.create({
      type: "basic",
      iconUrl: "icon128.png",
      title: title,
      message: message,
      priority: 2,
    });
  }

  private async retryConnection(): Promise<void> {
    this.retryCount++;
    this.log(
      LogLevel.INFO,
      `Retry attempt ${this.retryCount} of ${CONFIG.maxRetries}`
    );

    const delay = this.getRetryDelay();
    await this.sendNotification(
      "WebSocket Connection",
      `Retrying connection (${this.retryCount}/${CONFIG.maxRetries}) in ${
        delay / 1000
      } seconds...`
    );

    setTimeout(() => {
      this.connect();
    }, delay);
  }

  private setupEventHandlers(): void {
    if (!this.socket) return;

    this.socket.onopen = async () => {
      this.log(LogLevel.INFO, "WebSocket connected successfully.");
      this.retryCount = 0;
      await this.sendNotification(
        "WebSocket Connection",
        "Connected to the server successfully!"
      );
      await this.messageQueue.processQueue(this.socket!);
    };

    this.socket.onmessage = async (event) => {
      try {
        const response = JSON.parse(event.data) as ServerResponse;

        if (response.type === "token") {
          console.log(LogLevel.INFO, "Token Message:", response.data);

          const message = {
            type: "RESPONSE_RECEIVED",
            payload: response.data,
          };
          console.log(
            "Sending chrome runtime message to background.ts:",
            message
          );
          await chrome.runtime.sendMessage(message, (response) => {
            console.log(
              `Response from background.ts: ${JSON.stringify(response)}`
            );
          });
        }

        if (response.type === "complete") {
          console.log(LogLevel.INFO, "Complete Message:", response.data);
        }
      } catch (error) {
        this.log(LogLevel.ERROR, "Error parsing message:", error);
      }
    };

    this.socket.onerror = (error) => {
      this.log(LogLevel.ERROR, "WebSocket encountered an error:", error);
    };

    this.socket.onclose = async () => {
      this.log(LogLevel.INFO, "WebSocket connection closed.");
      if (this.retryCount < CONFIG.maxRetries) {
        await this.retryConnection();
      } else {
        await this.sendNotification(
          "WebSocket Connection",
          `Connection failed after ${CONFIG.maxRetries} attempts. No further retries.`
        );
      }
    };

    let accumulatedMessage = ""; // Variable to hold the accumulated message

    this.socket.onmessage = async (event) => {
      try {
        const response = JSON.parse(event.data) as ServerResponse;
        console.log("WebSocket message received:");

        if (response.type === "token") {
          // Append the current token's data to the accumulated message
          accumulatedMessage += response.data || "";

          // store partial messages in storage for real-time UI updates
          console.log("Storing partial message in storage:");
          await chrome.storage.local.set({
            serverResponse: accumulatedMessage,
          });
        } else if (response.type === "complete") {
          // Finalize the message storage when type is "complete"
          console.log("Final complete message received:");
          // Reset the accumulated message for future messages
          accumulatedMessage = "";
        } else {
          console.warn("Unhandled response type:", response.type);
        }

        // Handle popup creation or focus
        chrome.windows.getAll({ populate: true }, (windows) => {
          const existingWindow = windows.find((w) =>
            w.tabs?.some((tab) => tab.url?.includes("response.html"))
          );

          if (existingWindow) {
            console.log("Popup already open, focusing window");
            chrome.windows.update(existingWindow.id!, { focused: true });
          } else {
            console.log("Creating new popup window for response.html");
            chrome.windows.create({
              url: chrome.runtime.getURL("response.html"),
              type: "popup",
              width: 800,
              height: 900,
            });
          }
        });
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
  }

  public connect(): void {
    if (!this.backendUrl) {
      this.log(LogLevel.ERROR, "Backend URL is not defined!");
      return;
    }

    try {
      this.socket = new WebSocket(this.backendUrl);
      this.setupEventHandlers();
    } catch (error) {
      this.log(LogLevel.ERROR, "Error creating WebSocket:", error);
      this.retryConnection();
    }
  }

  public async sendMessage(message: WebSocketMessage): Promise<void> {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.log(LogLevel.WARN, "WebSocket is not open, queueing message");
      this.messageQueue.enqueue(message);
      return;
    }

    try {
      this.socket.send(JSON.stringify(message));
    } catch (error) {
      this.log(LogLevel.ERROR, "Error sending message:", error);
      this.messageQueue.enqueue(message);
    }
  }

  public async updateConfig(newConfig: Partial<StorageConfig>): Promise<void> {
    this.config = { ...this.config, ...newConfig };
    await chrome.storage.sync.set(newConfig);
  }

  public getConfig(): StorageConfig {
    return { ...this.config };
  }
}
