import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Info, User, MousePointer } from "lucide-react"; // Importing Lucid icons
import "../styles/global.css";

const App: React.FC<{}> = () => {
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.type === "RESPONSE_RECEIVED") {
        setResponse(message.payload.text);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const handleCloseDialog = () => {
    setResponse(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6 flex flex-col items-center w-80">
      {/* Header */}
      <div className="flex items-center mb-6">
        <img
          src="icon128.png"
          className="w-16 h-16 object-contain mr-4"
          alt="extension icon"
        />
        <h1 className="text-2xl font-bold text-blue-600">SimpliSense</h1>
      </div>

      {/* Description */}
      <div className="mb-4 text-center">
        <p className="text-gray-700">
          Harness the power of AI to explain complex concepts effortlessly.
        </p>
      </div>

      {/* Details */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-4">
        <div className="flex items-center mb-2">
          <Info className="w-5 h-5 text-blue-500 mr-2" />
          <p className="text-sm text-gray-600">
            <strong>Version:</strong> 1.0.0
          </p>
        </div>
        <div className="flex items-center mb-2">
          <User className="w-5 h-5 text-blue-500 mr-2" />
          <p className="text-sm text-gray-600">
            <strong>Author:</strong> Tefo Motatamali
          </p>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <MousePointer className="w-10 h-10 text-blue-500 mr-2" />{" "}
        <p className="text-sm text-gray-600">
          Highlight or select text in your browser to receive instant, detailed
          explanations of words, phrases, or concepts effortlessly.
        </p>
      </div>
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
