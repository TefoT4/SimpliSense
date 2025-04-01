import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../styles/global.css";
import ConnectionStatus from "../components/ConnectionStatus";
import { ConnectionProvider } from "../context/ConnectionContext";

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("Loading response...");
  const [isLoading, setIsLoading] = useState(false);
  const [showPanelWarning, setShowPanelWarning] = useState(false);

  useEffect(() => {
    // Check for side panel support
    if (!("sidePanel" in chrome)) {
      setShowPanelWarning(true);
    }

    chrome.storage.local.get(["serverResponse", "isLoading"], (data) => {
      if (data.serverResponse) {
        setMessage(data.serverResponse);
      } else {
        setMessage("No response available.");
      }
      setIsLoading(!!data.isLoading);
    });

    const onStorageChange = (changes: any, area: string) => {
      if (area === "local") {
        if (changes.serverResponse?.newValue) {
          setMessage(changes.serverResponse.newValue);
        }
        if (changes.isLoading) {
          setIsLoading(changes.isLoading.newValue);
        }
      }
    };
    chrome.storage.onChanged.addListener(onStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(onStorageChange);
    };
  }, []);

  return (
    <ConnectionProvider>
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col h-full">
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 🚨 Edge notice */}
          {showPanelWarning && (
            <div className="p-3 text-yellow-800 bg-yellow-100 border border-yellow-300 rounded">
              <strong>Note:</strong> Your browser does not support auto-opening
              the side panel. Please click the SimpliSense extension icon and
              choose <em>"Open Side Panel"</em>.
            </div>
          )}

          <div className="prose prose-sm max-w-none">
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                <span className="text-gray-900 dark:text-white">
                  Processing your request...
                </span>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                {message}
              </pre>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 text-sm text-gray-600 dark:text-white border-t border-gray-200 dark:border-gray-700">
          <p className="text-center">
            You have early access to a new product. Give us feedback on how to
            make it better:{" "}
            <a
              href="mailto:nextgetitframeworks@gmail.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              nextgetitframeworks@gmail.com
            </a>
          </p>
          <ConnectionStatus />
        </div>
      </div>
    </ConnectionProvider>
  );
};

// Root element creation and React rendering logic
const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
