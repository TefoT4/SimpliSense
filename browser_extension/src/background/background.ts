import { v4 as getId } from "uuid";
import { WebSocketManager } from "../framework/WebSocketManager";
import { StorageConfig } from "../models/StorageConfig";
import { CONFIG } from "../models/Config";
import { WebSocketMessage } from "../models/WebSocketMessage";

// Initialize WebSocket Manager
const wsManager = new WebSocketManager();

// Storage initialization
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
          wsManager.updateConfig(newSettings);
        } else {
          wsManager.updateConfig(result as StorageConfig);
        }
      }
    );
  } catch (error) {
    console.error("Storage initialization failed:", error);
    throw error;
  }
}

// Context Menu Setup
chrome.runtime.onInstalled.addListener(async () => {
  await chrome.contextMenus.create({
    id: "processText",
    title: "Explain with SimpliSense",
    contexts: ["selection"],
  });

  await initializeStorage();
  wsManager.connect();
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === "processText" && info.selectionText) {
    const config = wsManager.getConfig();
    const message: WebSocketMessage = {
      Id: config.Id,
      Llm: config.preferredLLM,
      ApiKey: config.apiKey,
      Query: info.selectionText.trim(),
    };

    await wsManager.sendMessage(message);
  }
});

// Cleanup on extension unload
chrome.runtime.onSuspend.addListener(() => {
  // Close WebSocket connection
  const socket = wsManager["socket"];
  if (socket) {
    socket.close();
  }
});

// Listen for storage changes
chrome.storage.onChanged.addListener(async (changes) => {
  const updates: Partial<StorageConfig> = {};

  if (changes.Id) updates.Id = changes.Id.newValue;
  if (changes.apiKey) updates.apiKey = changes.apiKey.newValue;
  if (changes.preferredLLM)
    updates.preferredLLM = changes.preferredLLM.newValue;

  if (Object.keys(updates).length > 0) {
    await wsManager.updateConfig(updates);
  }
});

// Track active popup windows
let activePopupId: number = 100;

// Clean up when popup closes
chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === activePopupId) {
    activePopupId = 0;
  }
});
