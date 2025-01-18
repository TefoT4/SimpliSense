import { LlmResponseMessage } from "../models/LlmResponseMessage";

export class LlmResponseMessageQueue {
  private queue: LlmResponseMessage[] = [];

  enqueue(message: LlmResponseMessage): void {
    this.queue.push(message);
  }

  async processQueue(): Promise<string> {
    let message: string = "";
    while (this.queue.length > 0) {
      const token = this.queue.shift();
      if (token) {
        message = token.data;
      }
      // Small delay to prevent flooding
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    return message;
  }
}
