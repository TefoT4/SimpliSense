import { LlmChat } from "../LlmChat";
import { StreamCallbacks } from "../../Shared/StreamCallbacks";

export class Gpt4Chat extends LlmChat {
  constructor(apiKey: string) {
    super(apiKey);
  }
  sendMessageStream(
    message: string,
    callbacks: StreamCallbacks
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
