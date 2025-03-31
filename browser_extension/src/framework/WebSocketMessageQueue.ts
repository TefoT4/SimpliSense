import { WebSocketMessage } from "../models/WebSocketMessage";

export class WebSocketMessageQueue {
  private queue: WebSocketMessage[] = [];

  enqueue(message: WebSocketMessage): void {
    this.queue.push(message);
  }

  async processQueue(socket: WebSocket): Promise<void> {
    try {
        while (this.queue.length > 0 && socket.readyState === WebSocket.OPEN) {
        const message = this.queue.shift();
        if (message) {
          socket.send(JSON.stringify(message));
        }
        // Small delay to prevent flooding
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    } catch (error) {
      console.error("Error processing WebSocket message queue:", error);
    }
  }
  
}
