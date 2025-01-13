// TODO: background script
chrome.runtime.onInstalled.addListener((): void => {
  chrome.contextMenus.create({
    id: "AISearchMenu",
    title: "Explain with AI",
    contexts: ["selection"],
  });

  chrome.contextMenus.onClicked.addListener((event: chrome.contextMenus.OnClickData): void => {
    if (event.menuItemId === "AISearchMenu") {
      const selectedText: string | undefined = event.selectionText;
      console.log(selectedText);
    }
  });
});