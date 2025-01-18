import { GeminiChat } from "../Implementations/GeminiChat";
import { Gpt4Chat } from "../Implementations/Gpt4Chat";
import { ClaudeChat } from "../Implementations/ClaudeChat";
import { GrokChat } from "../Implementations/GrokChat";
import { LLM } from "../../Shared/WebSocketMessage";

export class LlmFactory {
  public static CreateLLM(llm: LLM, apiKey: string) {
    switch (llm) {
      case LLM.Gemini:
        return new GeminiChat(apiKey);
      case LLM.GPT4:
        return new Gpt4Chat(apiKey);
      case LLM.CLAUDE:
        return new ClaudeChat(apiKey);
      case LLM.GROK:
        return new GrokChat(apiKey);
      case LLM.OLLAMA:
      case LLM.OTHER:
        break;
      default:
        return new GeminiChat(apiKey);
    }
  }
}
