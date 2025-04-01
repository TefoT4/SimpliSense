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

  const connect = () => {
    setStatus("connecting");

    // Simulate connection process
    setTimeout(() => {
      setStatus("connected");
    }, 2000);
  };

  const disconnect = () => {
    setStatus("disconnected");
  };

  // Auto-connect on load
  useEffect(() => {
    connect();
  }, []);

  return (
    <ConnectionContext.Provider value={{ status, connect, disconnect }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnectionStatus = () => {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error(
      "useConnectionStatus must be used within a ConnectionProvider"
    );
  }
  return context;
};
