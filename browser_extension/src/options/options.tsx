import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ChevronDown, Key, Globe } from "lucide-react"; // Importing lucid icons
import "../styles/global.css";

const App: React.FC<{}> = () => {
  const [preferredLLM, setPreferredLLM] = useState("Gemini");
  const [apiKey, setApiKey] = useState("");

  // Load settings from chrome.storage when the component mounts
  useEffect(() => {
    chrome.storage.sync.get(["apiKey", "preferredLLM"], (result) => {
      const storedApiKey = result.apiKey || ""; // Default to blank
      const storedPreferredLLM = result.preferredLLM || "Gemini"; // Default to Gemini

      setApiKey(storedApiKey);
      setPreferredLLM(storedPreferredLLM);
    });
  }, []);

  const handleSaveSettings = () => {
    chrome.storage.sync.set({ preferredLLM, apiKey }, () => {
      console.log("Settings saved successfully!");

      chrome.notifications.create(
        {
          type: "basic",
          iconUrl: "icon48.png", // Ensure the path is correct
          title: "SimpliSense Extension",
          message: "User preferences saved successfully!",
          priority: 2,
        },
        (notificationId) => {
          if (chrome.runtime.lastError) {
            console.error(
              "Notification error:",
              chrome.runtime.lastError.message
            );
          } else {
            console.log("Notification sent successfully:", notificationId);
          }
        }
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6 flex flex-col items-center">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <img
            src="icon128.png"
            className="w-12 h-12 object-contain mr-4"
            alt="extension icon"
          />
          <h1 className="text-2xl font-bold text-blue-600">
            SimpliSense Settings
          </h1>
        </div>

        {/* Preferred LLM */}
        <div className="mb-6">
          <label
            className="flex items-center gap-2 text-gray-700 text-sm font-semibold mb-2"
            htmlFor="llm-select"
          >
            <Globe className="w-4 h-4 text-blue-500" /> Select Your Preferred
            LLM
          </label>
          <div className="relative">
            <select
              id="llm-select"
              value={preferredLLM}
              onChange={(e) => setPreferredLLM(e.target.value)}
              className="block w-full appearance-none bg-gray-100 border border-gray-300 rounded py-2 px-4 leading-tight text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="Gemini">Gemini</option>
              <option value="OpenAI">OpenAI ChatGPT</option>
              <option value="Claude">Anthropic Claude</option>
              <option value="Ollama">Ollama</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-500" />
          </div>
          <p className="text-gray-500 text-xs italic mt-1">
            Choose your preferred LLM provider.
          </p>
        </div>

        {/* API Key */}
        <div className="mb-6">
          <label
            className="flex items-center gap-2 text-gray-700 text-sm font-semibold mb-2"
            htmlFor="api-key"
          >
            <Key className="w-4 h-4 text-blue-500" /> API Key
          </label>
          <input
            type="text"
            id="api-key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="block w-full bg-gray-100 border border-gray-300 rounded py-2 px-4 leading-tight text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <p className="text-gray-500 text-xs italic mt-1">
            Your API key for the selected LLM provider.
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveSettings}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
