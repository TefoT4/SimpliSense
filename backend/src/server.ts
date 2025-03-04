import * as dotenv from "dotenv";
import { WebSocketServer, WebSocket } from "ws";
import { LlmFactory } from "./LLM/Factory/LlmFactory";
import { WebSocketMessage } from "./Shared/WebSocketMessage";

dotenv.config();

const PORT = process.env.SERVER_PORT || 9900;
const RATE_LIMIT = 5; // Max 5 messages per second
const CLIENT_IDLE_TIMEOUT = 60000; // 1-minute idle timeout

const clientRateLimits = new Map<string, number>();
const clientTimeouts = new Map<WebSocket, NodeJS.Timeout>();

// Create WebSocket Server
const websocketServer = new WebSocketServer({ port: Number(PORT) });
console.log(`WebSocket server is running on ws://localhost:${PORT}`);

// ✅ WebSocket-based Health Check
const healthCheckServer = new WebSocketServer({ noServer: true });

websocketServer.on("connection", (socket: WebSocket, request) => {
  console.log("Client connected");

  const clientId = request.socket.remoteAddress || "unknown";

  const resetClientTimeout = () => {
    if (clientTimeouts.has(socket)) {
      clearTimeout(clientTimeouts.get(socket)!);
    }
    clientTimeouts.set(
      socket,
      setTimeout(() => {
        console.warn("Client idle for too long, disconnecting...");
        socket.close();
      }, CLIENT_IDLE_TIMEOUT)
    );
  };

  resetClientTimeout();

  socket.on("message", (data) => {
    resetClientTimeout();

    try {
      const currentTime = Date.now();
      const lastRequestTime = clientRateLimits.get(clientId) || 0;

      if (currentTime - lastRequestTime < 1000 / RATE_LIMIT) {
        socket.send(JSON.stringify({ error: "Rate limit exceeded." }));
        return;
      }

      clientRateLimits.set(clientId, currentTime);

      const parsedData: WebSocketMessage = JSON.parse(data.toString());
      console.log("Formatted message:\n", parsedData);

      if (!parsedData.Llm || !parsedData.Query) {
        throw new Error("Invalid message structure");
      }

      if (parsedData.Llm !== "gemini" && !parsedData.ApiKey) {
        throw new Error("Missing API key");
      }

      if (parsedData.Llm === "gemini" && !parsedData.ApiKey) {
        parsedData.ApiKey = process.env.GEMINI_API_KEY!;
      }

      console.log("Received message:", parsedData);

      sendRequestToLLM(parsedData, socket);
    } catch (err) {
      console.error("Error processing message:", err);
      socket.send(
        JSON.stringify({
          type: "error",
          timestamp: new Date().toISOString(),
          message: "Invalid message format. Ensure the JSON object is correct.",
        })
      );
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
    if (clientTimeouts.has(socket)) {
      clearTimeout(clientTimeouts.get(socket)!);
      clientTimeouts.delete(socket);
    }
    clientRateLimits.delete(clientId);
  });
});

// ✅ WebSocket-based Health Check
websocketServer.on("upgrade", (request, socket, head) => {
  if (request.url === "/isalive") {
    healthCheckServer.handleUpgrade(request, socket, head, (ws) => {
      healthCheckServer.emit("connection", ws, request);
    });
  }
});

healthCheckServer.on("connection", (ws) => {
  console.log("Health check WebSocket connected");
  ws.send(JSON.stringify({ status: "ok" }));
  setTimeout(() => ws.close(), 1000);
});

async function sendRequestToLLM(
  parsedData: WebSocketMessage,
  socket: WebSocket
) {
  const llm = LlmFactory.CreateLLM(parsedData.Llm, parsedData.ApiKey);

  if (!llm) {
    console.error("Failed to create LLM instance");
    socket.send(
      JSON.stringify({
        type: "error",
        timestamp: new Date().toISOString(),
        message: "Failed to create LLM instance. Check LLM type and API key.",
      })
    );
    return;
  }

  try {
    await llm.sendMessageStream(parsedData.Query, {
      onToken: (token) => {
        socket.send(JSON.stringify({ type: "token", data: token }));
      },
      onComplete: () => {
        socket.send(
          JSON.stringify({
            type: "complete",
            message: "Stream completed",
          })
        );
        console.log("Stream completed");
      },
      onError: (error) => {
        socket.send(
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
    socket.send(
      JSON.stringify({
        type: "error",
        message: error.message || "Unknown error",
      })
    );
  }
}
