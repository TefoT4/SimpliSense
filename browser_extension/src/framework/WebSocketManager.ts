import { CONFIG } from "../models/Config";
import { LogLevel } from "../models/LogLevel";
import { WebSocketMessageQueue } from "./WebSocketMessageQueue";
import { StorageConfig } from "../models/StorageConfig";
import { ServerResponse } from "../models/ServerResponse";
import { WebSocketMessage } from "../models/WebSocketMessage";
import { LlmResponseMessageQueue } from "../framework/LlmResponseMessageQueue";
import { LlmResponseMessage } from "../models/LlmResponseMessage";

export class WebSocketManager {
  private socket: WebSocket | null = null;
  private retryCount = 0;
  private messageQueue: WebSocketMessageQueue;
  private responseMessageQueue: LlmResponseMessageQueue;
  private config: StorageConfig;

  constructor(
    private readonly backendUrl: string = process.env.REACT_APP_BACKEND_URL ??
      (() => {
        throw new Error("Backend URL is required");
      })()
  ) {
    this.messageQueue = new WebSocketMessageQueue();
    this.responseMessageQueue = new LlmResponseMessageQueue();
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
        this.log(LogLevel.INFO, "Message from server:", response);

        if (response.type === "token") {
          const responseMessage: LlmResponseMessage = {
            type: response.type,
            data: response.payload,
            message: "",
          };
          this.responseMessageQueue.enqueue(responseMessage);
        } else if (response.type === "complete") {
          
          const processedMessage = await this.responseMessageQueue.processQueue();

          console.log(LogLevel.INFO, "Processed message:", processedMessage);

          await chrome.runtime.sendMessage({
            type: "RESPONSE_RECEIVED",
            payload: await processedMessage,
          });
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
