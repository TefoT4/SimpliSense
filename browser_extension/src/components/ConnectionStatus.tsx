import React, { useEffect, useState } from "react";
import { useConnectionStatus } from "../context/ConnectionContext";

type Status = "disconnected" | "connecting" | "connected";

const ConnectionStatus: React.FC = () => {
  const { status } = useConnectionStatus();
  const [activeCircle, setActiveCircle] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === "connecting") {
      interval = setInterval(() => {
        setActiveCircle((prev) => (prev + 1) % 3);
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status]);

  const getCircleColor = (index: number) => {
    if (status === "disconnected") return "bg-red-500";
    if (status === "connected") return "bg-green-500";

    // For connecting status
    return activeCircle === index ? "bg-yellow-400" : "bg-yellow-200";
  };

  return (
    <div className="flex justify-center space-x-2 mt-4 mb-2">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full ${getCircleColor(index)}`}
        ></div>
      ))}
    </div>
  );
};

export default ConnectionStatus;
