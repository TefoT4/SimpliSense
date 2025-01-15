let socket: WebSocket | null = null;
const backendUrl = process.env.REACT_APP_BACKEND_URL || "wss://default-url";
let retryCount = 0;
const maxRetries = 30;
const retryInterval = 60 * 1000; // 60 seconds

// Function to create WebSocket connection
function connectWebSocket() {
  if (!backendUrl) {
    console.error("Backend URL is not defined!");
    return;
  }

  try {
    socket = new WebSocket(backendUrl);

    // WebSocket Event Handlers
    socket.onopen = () => {
      console.log("WebSocket connected successfully.");
      retryCount = 0; // Reset retry count on successful connection
      sendNotification(
        "WebSocket Connection",
        "Connected to the server successfully!"
      );
    };
  } catch (error) {
    console.error("Error creating WebSocket:", error);
    retryConnection;
    return;
  }

  socket.onmessage = (event) => {
    try {
      const response = JSON.parse(event.data);
      console.log("Message from server:", response);

      // Forward the response to other parts of the extension
      chrome.runtime.sendMessage({
        type: "RESPONSE_RECEIVED",
        payload: response,
      });
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket encountered an error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed.");
    if (retryCount < maxRetries) {
      retryConnection();
    } else {
      sendNotification(
        "WebSocket Connection",
        `Connection failed after ${maxRetries} attempts. No further retries.`
      );
    }
  };
}

// Retry mechanism for WebSocket connection
function retryConnection() {
  retryCount++;
  console.log(`Retry attempt ${retryCount} of ${maxRetries}`);
  sendNotification(
    "WebSocket Connection",
    `Retrying connection (${retryCount}/${maxRetries}) in 60 seconds...`
  );

  setTimeout(() => {
    connectWebSocket();
  }, retryInterval);
}

// Send notifications
function sendNotification(title: string, message: string) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "images/icon128.png",
    title: title,
    message: message,
    priority: 2,
  });
}

// Initialize WebSocket connection
connectWebSocket();

// Context Menu Setup
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
      sendNotification(
        "WebSocket Error",
        "Unable to send message. Connection is not open."
      );
    }
  }
});
