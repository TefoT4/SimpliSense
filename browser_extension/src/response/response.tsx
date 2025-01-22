import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../styles/global.css";

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("Loading response...");

  useEffect(() => {
    // Fetch the initial message from storage
    chrome.storage.local.get("serverResponse", (data) => {
      if (data.serverResponse) {
        setMessage(data.serverResponse);
      } else {
        setMessage("No response available.");
      }
    });

    // Monitor storage changes and update the UI
    const onStorageChange = (changes: any, area: string) => {
      if (area === "local" && changes.serverResponse?.newValue) {
        setMessage(changes.serverResponse.newValue);
      }
    };
    chrome.storage.onChanged.addListener(onStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(onStorageChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col h-full">
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap bg-gray-50 p-2 rounded border border-gray-200">
            {message}
          </pre>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 text-sm text-gray-600 border-t border-gray-200">
        <p className="text-center">
          You have early access to a new product. Give us feedback on how to
          make it better:{" "}
          <a
            href="mailto:extension@simplisense.com"
            className="text-blue-600 hover:underline"
          >
            extension@simplisense.com
          </a>
        </p>
      </div>
    </div>
  );
};

// Root element creation and React rendering logic
const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
