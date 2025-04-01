import React, { createContext, useContext, useState, useEffect } from "react";

type ConnectionStatus = "disconnected" | "connecting" | "connected";

interface ConnectionContextType {
  status: ConnectionStatus;
  connect: () => void;
  disconnect: () => void;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(
  undefined
);

export const ConnectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");

  useEffect(() => {
    // Listen for updates from the background WebSocketManager
    const listener = (message: any) => {
      if (message.type === "socket-status") {
        setStatus(message.status);
      }
    };

    chrome.runtime.onMessage.addListener(listener);

    // Auto-connect
    connect();

    return () => {
      chrome.runtime.onMessage.removeListener(listener);
      disconnect();
    };
  }, []);

  const connect = () => {
    setStatus("connecting");
    chrome.runtime.sendMessage({ type: "connect-socket" });
  };

  const disconnect = () => {
    chrome.runtime.sendMessage({ type: "disconnect-socket" });
    setStatus("disconnected");
  };

  return (
    <ConnectionContext.Provider value={{ status, connect, disconnect }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnectionStatus = () => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error(
      "useConnectionStatus must be used within a ConnectionProvider"
    );
  }
  return context;
};
