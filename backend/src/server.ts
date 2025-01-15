import WebSocket, { WebSocketServer } from "ws";

// Define message types
interface ClientMessage {
  text: string;
}

interface ServerMessage {
  original: string;
  processed: string;
}

// Create the WebSocket server
const PORT = 8080;
const wss = new WebSocketServer({ port: PORT }, () => {
  console.log(`WebSocket server started on ws://localhost:${PORT}`);
});

// Handle client connections
wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  // Handle messages from clients
  ws.on("message", (data: WebSocket.RawData) => {
    console.log("Received:", data.toString());

    try {
      // Parse incoming message
      const message: ClientMessage = JSON.parse(data.toString());

      // Process the text (example: reverse the text)
      const processedText = message.text.split("").reverse().join("");

      // Send response back to the client
      const response: ServerMessage = {
        original: message.text,
        processed: processedText,
      };
      ws.send(JSON.stringify(response));
      
    } catch (error) {
      console.error("Error processing message:", error);
      ws.send(
        JSON.stringify({
          error:
            "Invalid message format. Expected JSON with a 'text' property.",
        })
      );
    }
  });

  // Handle connection close
  ws.on("close", () => {
    console.log("Client disconnected");
  });

  // Handle errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});
