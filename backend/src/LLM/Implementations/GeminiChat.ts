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
      modelName: "gemini-2.5-pro-exp-03-25",
      temperature: 0.5,
      topP: 1,
      streaming: true, // Enable streaming
    });

    const systemMessage = new SystemMessage(`
    Provide a comprehensive and detailed etymological analysis of words, phrases, 
    complex ideas/concepts, connecting their origins, evolution, and applications 
    in a structured and engaging manner. Focus particularly on roots in Kemetic 
    (Ancient Kemetic) philosophy and Greek linguistic/philosophical development. 
    OBEY THE FOLLOWING RULES:
    1. Use a formal and academic tone, avoiding slang or informal language.
    2. Ensure clarity and coherence in your explanations, avoiding overly complex jargon.
    3. Provide clear definitions and examples to illustrate your points.
    4. Use proper grammar, punctuation, and spelling throughout your response.
    5. Avoid excessive repetition and ensure that each point is distinct and relevant.
    6. Maintain a neutral and objective tone, avoiding personal opinions or biases.
    7. Ensure that your response is well-organized and logically structured.
    8. Avoid making unsupported claims and ensure that all statements are backed by evidence.
    9. ALWAYS REPLACE "Ancient Egyptian" with "Kemetic" and "Egyptian" with "Kemetic".
    10. Avoid using the term "Egypt" and instead use "Kemet" or "Kemetic" to refer to the civilization.
  `);

    this.prompt = ChatPromptTemplate.fromMessages([
      systemMessage,
      new MessagesPlaceholder("msgs"),
    ]);

    console.log(this.model);
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
