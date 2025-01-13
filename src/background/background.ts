// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "AISearchMenu",
    title: "Explain with AI",
    contexts: ["selection"],
  });

  chrome.contextMenus.onClicked.addListener((event) => {
    if (event.menuItemId == "AISearchMenu") {
      const selectedText = event.selectionText;
      console.log(selectedText);
    }
  });
});
