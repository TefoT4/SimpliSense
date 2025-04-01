import { v4 as getId } from "uuid";
import { StorageConfig } from "../models/StorageConfig";
import { CONFIG } from "../models/Config";
import { WebSocketMessage } from "../models/WebSocketMessage";
import webSocketManager from "../framework/WebSocketManager";

// 🔁 Broadcast socket status to UI
function broadcastSocketStatus(status: "connected" | "disconnected") {
  chrome.runtime.sendMessage({ type: "socket-status", status }).catch((e) => {
    if (!e.message.includes("Receiving end does not exist")) {
      console.error("Failed to send socket status:", e);
    }
  });
}

// 📦 Initialize user config in storage
async function initializeStorage(): Promise<void> {
  try {
    await chrome.storage.sync.get(
      ["Id", "apiKey", "preferredLLM"],
      (result) => {
        if (!result.Id || !result.preferredLLM) {
          const newSettings: StorageConfig = {
            Id: getId(),
            apiKey: "",
            preferredLLM: CONFIG.defaultLLM,
          };
          webSocketManager.updateConfig(newSettings);
        } else {
          webSocketManager.updateConfig(result as StorageConfig);
        }
      }
    );
  } catch (error) {
    console.error("Storage initialization failed:", error);
    throw error;
  }
}

// 🔌 WebSocket Events
webSocketManager.onOpen(() => broadcastSocketStatus("connected"));
webSocketManager.onClose(() => broadcastSocketStatus("disconnected"));
webSocketManager.onError(() => broadcastSocketStatus("disconnected"));

// 📋 Add context menu on install
chrome.runtime.onInstalled.addListener(async () => {
  await chrome.contextMenus.create({
    id: "processText",
    title: "Explain with SimpliSense",
    contexts: ["selection"],
  });

  await initializeStorage();
  webSocketManager.connect();
});

// 📋 Context menu handler (side panel only)
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "processText" && info.selectionText) {
    const config = webSocketManager.getConfig();
    const message: WebSocketMessage = {
      Id: config.Id,
      Llm: config.preferredLLM,
      ApiKey: config.apiKey,
      Query: info.selectionText.trim(),
    };

    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error(error));

    chrome.sidePanel
      .open({ tabId: tab?.id!, windowId: tab?.windowId })
      .catch((error) => console.error(error));

    chrome.sidePanel.setOptions({
      path: "response.html",
      enabled: true,
    });

    console.log("Sending message to WebSocket...");
    await webSocketManager.sendMessage(message);
  }
});

// 🔄 Update stored config
chrome.storage.onChanged.addListener(async (changes) => {
  const updates: Partial<StorageConfig> = {};

  if (changes.Id) updates.Id = changes.Id.newValue;
  if (changes.apiKey) updates.apiKey = changes.apiKey.newValue;
  if (changes.preferredLLM)
    updates.preferredLLM = changes.preferredLLM.newValue;

  if (Object.keys(updates).length > 0) {
    await webSocketManager.updateConfig(updates);
  }
});

// 🧹 Cleanup WebSocket on suspend
chrome.runtime.onSuspend.addListener(() => {
  const socket = webSocketManager["socket"];
  if (socket) {
    socket.close();
  }
});

// 📩 Minimal message handling
chrome.runtime.onMessage.addListener((request) => {
  if (request.type === "connect-socket") {
    webSocketManager.connect();
  }

  if (request.type === "disconnect-socket") {
    webSocketManager.disconnect();
  }

  return false;
});
