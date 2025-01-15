// TODO: background script

import { LLM } from "../framework/LLM";

chrome.runtime.onInstalled.addListener((): void => {
  chrome.contextMenus.create({
    id: "AISearchMenu",
    title: "Explain with AI",
    contexts: ["selection"],
  });

  chrome.contextMenus.onClicked.addListener(
    (event: chrome.contextMenus.OnClickData): void => {
      if (event.menuItemId === "AISearchMenu") {
        const selectedText: string | undefined = event.selectionText;
        console.log(selectedText);
      }
    }
  );

  chrome.storage.local.get(["apiKey", "preferredLLM"], (result) => {
    const apiKey = result.apiKey || ""; // Default to blank
    const preferredLLM = result.preferredLLM || LLM.Gemini; // Default to Gemini
  });
});
