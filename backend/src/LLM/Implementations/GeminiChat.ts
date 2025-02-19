import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { LlmChat } from "../LlmChat";
import { StreamCallbacks } from "../../Shared/StreamCallbacks";
import * as dotenv from "dotenv";

dotenv.config();

export class GeminiChat extends LlmChat {
  private model: ChatGoogleGenerativeAI;
  private prompt: ChatPromptTemplate;

  constructor(apiKey: string) {
    super(apiKey);
    this.model = new ChatGoogleGenerativeAI({
      apiKey,
      modelName: "gemini-pro",
      temperature: 0.5,
      topP: 1,
      streaming: true, // Enable streaming
    });

    const systemMessage = new SystemMessage(`
      Simulate a knowledgeable and insightful cultural historian with a deep understanding of 
      Kemetic philosophy and its influences across history. Combine expertise in ancient civilizations, 
      linguistics, Technology, Engineering, Science, Physics, Biology, Nature, and cultural studies with the ability to analyze contemporary relevance. Provide detailed, 
      multidisciplinary explorations of words, phrases, complex ideas/concepts, connecting their origins, evolution, and applications in a 
      structured and engaging manner.
    `);

    this.prompt = ChatPromptTemplate.fromMessages([
      systemMessage,
      new MessagesPlaceholder("msgs"),
    ]);
  }

  async sendMessageStream(message: string, callbacks: StreamCallbacks) {
    try {
      const humanMessageTemplate = `
        Provide a comprehensive etymological analysis of '${message}', where '${message}' can be either a words, phrases, complex idea/concept. 
        The analysis should Focus particularly on its roots in Kemetic (Ancient Egyptian) philosophy and Greek linguistic/philosophical development. Include:
         1. The Kemetic philosophical concepts and principles that shaped its understanding (if applicable)
         2. The Greek etymological and philosophical evolution, including key related terms
         3. The complete etymological journey to modern English (if applicable)
         4. Contemporary examples of its manifestation/usage across different contexts (traditional, social, and professional)
         5. Example sentences or scenarios demonstrating its use in various forms of speech and thought
      `;
      const humanMessage = new HumanMessage(humanMessageTemplate);

      const chain = this.prompt.pipe(this.model);

      const stream = await chain.stream({
        msgs: [humanMessage],
      });

      let fullResponse = "";

      try {
        for await (const chunk of stream) {
          if (chunk.content) {
            fullResponse += chunk.content;
            callbacks.onToken(chunk.content.toString());
          }
        }

        callbacks.onComplete?.();
        return fullResponse;
      } catch (streamError) {
        if (streamError instanceof Error) {
          callbacks.onError?.(
            new Error(`Stream processing failed: ${streamError.message}`)
          );
        } else {
          callbacks.onError?.(
            new Error("Stream processing failed with an unknown error")
          );
        }
        throw streamError;
      }
    } catch (error) {
      if (error instanceof Error) {
        callbacks.onError?.(
          new Error(`Failed to get response from Gemini: ${error.message}`)
        );
      } else {
        callbacks.onError?.(
          new Error("Failed to get response from Gemini: unknown error")
        );
      }
      throw error;
    }
  }
}
