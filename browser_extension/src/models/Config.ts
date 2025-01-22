// Configuration
export const CONFIG = {
  maxRetries: 30,
  baseRetryInterval: 1000,
  maxRetryDelay: 30000,
  defaultLLM: "gemini",
  idleTimeout: 60000,
} as const;
