import { CONFIG } from "../models/Config";
import { LogLevel } from "../models/LogLevel";
import { StorageConfig } from "../models/StorageConfig";
import { ServerResponse } from "../models/ServerResponse";
import { WebSocketMessage } from "../models/WebSocketMessage";
import { WebSocketMessageQueue } from "./WebSocketMessageQueue";

class WebSocketManager {
  private retryCount = 0;
  private config: StorageConfig;
  private socket: WebSocket | null = null;
  private messageQueue: WebSocketMessageQueue;
  private idleTimeout: NodeJS.Timeout | null = null;
  private accumulatedMessage: string = "";

  // Event listener storage
  private onOpenListeners: (() => void)[] = [];
  private onCloseListeners: (() => void)[] = [];
  private onErrorListeners: (() => void)[] = [];

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
    const base = CONFIG.baseRetryInterval;
    const max = CONFIG.maxRetryDelay;
    const exponential = Math.min(base * Math.pow(2, this.retryCount), max);
    const jitter = Math.random() * 1000; // Add up to 1s random jitter
    return exponential + jitter;
  }

  private resetIdleTimer(): void {
    if (this.idleTimeout) clearTimeout(this.idleTimeout);
    this.idleTimeout = setTimeout(() => {
      this.log(LogLevel.WARN, "WebSocket idle for too long, reconnecting...");
      this.socket?.close();
    }, CONFIG.idleTimeout);
  }

  private setupEventHandlers(): void {
    if (!this.socket) return;

    this.socket.onopen = async () => {
      this.log(LogLevel.INFO, "WebSocket connected successfully.");
      this.retryCount = 0;
      this.resetIdleTimer();
      this.onOpenListeners.forEach((cb) => cb());
      await this.messageQueue.processQueue(this.socket!);
    };

    this.socket.onmessage = async (event) => {
      this.resetIdleTimer();
      try {
        const response = JSON.parse(event.data) as ServerResponse;
        switch (response.type) {
          case "token":
            this.handleTokenMessage(response.data);
            break;
          case "complete":
            this.handleCompleteMessage(response.data);
            break;
          default:
            console.warn("Unhandled response type:", response.type);
        }
      } catch (error) {
        this.log(LogLevel.ERROR, "Error parsing WebSocket message:", error);
      }
    };

    this.socket.onerror = (error) => {
      this.log(LogLevel.ERROR, "WebSocket encountered an error:", error);
      this.onErrorListeners.forEach((cb) => cb());
    };

    this.socket.onclose = async () => {
      this.log(LogLevel.INFO, "WebSocket connection closed.");
      this.onCloseListeners.forEach((cb) => cb());

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

  private handleTokenMessage(data: string): void {
    this.accumulatedMessage += data;
    chrome.storage.local.set({
      serverResponse: this.accumulatedMessage,
    });
  }

  private handleCompleteMessage(data: string): void {
    this.accumulatedMessage = "";
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

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  public onOpen(cb: () => void): void {
    this.onOpenListeners.push(cb);
  }

  public onClose(cb: () => void): void {
    this.onCloseListeners.push(cb);
  }

  public onError(cb: () => void): void {
    this.onErrorListeners.push(cb);
  }

  public isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}

const webSocketManager = new WebSocketManager();
export default webSocketManager;