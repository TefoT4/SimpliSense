import { StreamCallbacks } from "../Shared/StreamCallbacks";

export abstract class LlmChat {
  constructor(public apiKey: string) {}

  abstract sendMessageStream(
    message: string,
    callbacks: StreamCallbacks
  ): Promise<string>;
}
