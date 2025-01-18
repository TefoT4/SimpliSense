export enum LLM {
  Gemini = "gemini",
  GPT4 = "gpt4",
  CLAUDE = "claude",
  GROK = "grok",
  OLLAMA = "ollama",
  OTHER = "other",
}

export interface WebSocketMessage {
  Id: string;
  Llm: LLM;
  ApiKey: string;
  Content: string;
}
