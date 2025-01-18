import * as dotenv from "dotenv";
import { WebSocketServer, WebSocket } from "ws";
import { LlmFactory } from "./LLM/Factory/LlmFactory";
import { WebSocketMessage } from "./Shared/WebSocketMessage";
import { LLM } from "./Shared/WebSocketMessage";
dotenv.config();

const PORT = process.env.SERVER_PORT || 9900;

// Create WebSocket Server
const websockerServer = new WebSocketServer({ port: Number(PORT) });

console.log(`WebSocket server is running on ws://localhost:${PORT}`);

websockerServer.on("connection", (webSocker: WebSocket) => {
  console.log("Client connected");

  webSocker.on("message", (data) => {
    try {
      // Parse the incoming data
      const parsedData: WebSocketMessage = JSON.parse(data.toString());

      if (!parsedData.Llm || !parsedData.Content) {
        throw new Error("Invalid message structure");
      }

      if (parsedData.Llm !== LLM.Gemini && !parsedData.ApiKey) {
        throw new Error("Missing API key");
      }

      if (parsedData.Llm === LLM.Gemini && !parsedData.ApiKey) {
        parsedData.ApiKey = process.env.GEMINI_API_KEY!;
      }

      console.log("Received message:", parsedData);

      // Send the parsed data to an AI model
      sendRequestToLLM(parsedData, webSocker);
    } catch (err) {
      console.error("Error processing message:", err);
      webSocker.send(
        JSON.stringify({
          error: "Invalid message format. Ensure the JSON object is correct.",
        })
      );
    }
  });

  webSocker.on("close", () => {
    console.log("Client disconnected");
  });
});

async function sendRequestToLLM(
  parsedData: WebSocketMessage,
  webSocker: WebSocket
) {
  const llm = LlmFactory.CreateLLM(parsedData.Llm, parsedData.ApiKey);

  if (!llm) {
    console.error("Failed to create LLM instance");
    webSocker.send(
      JSON.stringify({
        error: "Failed to create LLM instance. Check LLM type and API key.",
      })
    );
    return;
  }

  try {
    await llm.sendMessageStream(parsedData.Content, {
      onToken: (token) => {
        // Send each token back to the client
        webSocker.send(JSON.stringify({ type: "token", data: token }));
      },
      onComplete: () => {
        // Notify the client that the stream is complete
        webSocker.send(
          JSON.stringify({ type: "complete", message: "Stream completed" })
        );
        console.log("\n\nStream completed");
      },
      onError: (error) => {
        // Notify the client of an error
        webSocker.send(
          JSON.stringify({
            type: "error",
            message: error.message || "Unknown error",
          })
        );
        console.error("Stream error:", error);
      },
    });
  } catch (error: any) {
    console.error("Error:", error);
    webSocker.send(
      JSON.stringify({
        type: "error",
        message: error.message || "Unknown error",
      })
    );
  }
}
