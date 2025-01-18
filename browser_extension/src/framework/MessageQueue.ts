import { WebSocketMessage } from "../models/WebSocketMessage";

export class MessageQueue {
  private queue: WebSocketMessage[] = [];

  enqueue(message: WebSocketMessage): void {
    this.queue.push(message);
  }

  async processQueue(socket: WebSocket): Promise<void> {
    while (this.queue.length > 0 && socket.readyState === WebSocket.OPEN) {
      const message = this.queue.shift();
      if (message) {
        socket.send(JSON.stringify(message));
      }
      // Small delay to prevent flooding
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
}
