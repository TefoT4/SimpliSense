let socket: WebSocket | null = null;

// Dynamically load backend URL from environment variables
const backendUrl = process.env.REACT_APP_BACKEND_URL;

if (!backendUrl) {
  console.error("Backend URL is not defined in environment variables!");
} else {
  socket = new WebSocket(backendUrl);

  // WebSocket event handlers
  socket.onopen = () => {
    console.log("WebSocket connection established.");
  };

  socket.onmessage = (event) => {
    try {
      const response = JSON.parse(event.data);
      console.log("Received message from WebSocket:", response);

      // Send response to other extension parts via runtime messaging
      chrome.runtime.sendMessage({
        type: "RESPONSE_RECEIVED",
        payload: response,
      });
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket encountered an error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed.");
  };
}

// Listen for context menu interactions
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "processText",
    title: "Process with Explaino",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "processText" && info.selectionText && socket) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ text: info.selectionText }));
    } else {
      console.warn("WebSocket is not open.");
    }
  }
});
