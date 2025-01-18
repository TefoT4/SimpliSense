import React, { useState, useEffect } from "react";
import { LlmResponseMessage } from "../models/LlmResponseMessage";

const ServerResponseWindow = () => {
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we're in a Chrome extension environment
    if (typeof chrome !== "undefined" && chrome.runtime?.onMessage) {
      const messageListener = (
        message: any,
        sender: any,
        sendResponse: any
      ) => {
        if (message.type === "RESPONSE_RECEIVED") {
          setResponse(message.payload);
          setIsLoading(false);
        }
        // Return true if you want to send a response asynchronously
        return true;
      };

      chrome.runtime.onMessage.addListener(messageListener);

      return () => {
        chrome.runtime.onMessage.removeListener(messageListener);
      };
    } else {
      // For development/testing outside of Chrome extension
      console.warn("Not running in Chrome extension environment");
      setIsLoading(false);
      setResponse("Test response - not in Chrome extension environment");
    }
  }, []);

  const handleClose = () => {
    if (typeof chrome !== "undefined" && chrome.windows?.getCurrent) {
      chrome.windows.getCurrent((window) => {
        chrome.windows.remove(window.id);
      });
    } else {
      window.close();
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-yellow-400"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L2 19h20L12 2zm0 3l7.5 13h-15L12 5z" />
          </svg>
          <span className="font-semibold text-gray-800 uppercase tracking-wide">
            SimpliSense
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Settings"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
            </svg>
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={handleClose}
            aria-label="Close"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            {typeof response === "string" ? (
              <p className="whitespace-pre-wrap">{response}</p>
            ) : (
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(response, null, 2)}
              </pre>
            )}
          </div>
        )}
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
            extension@shortform.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ServerResponseWindow;
