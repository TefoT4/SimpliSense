import React, { useState } from "react";
import { X, Hand } from "lucide-react";
import "../styles/global.css";

const DraggableDialog: React.FC<{
  response: string | null;
  onClose: () => void;
}> = ({ response, onClose }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const handleDrag = (e: React.MouseEvent) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  if (!response) return null;

  return (
    <div
      className="fixed bg-white shadow-xl rounded-lg w-96 p-4 border border-gray-300"
      style={{ top: position.y, left: position.x, position: "absolute" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-move"
        onMouseDown={handleDrag}
      >
        <h2 className="text-lg font-bold text-gray-700">Response</h2>
        <Hand className="w-5 h-5 text-gray-500" />
        <button title="X" onClick={onClose} className="text-red-500">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="mt-4 text-gray-600">
        <p>{response}</p>
      </div>
    </div>
  );
};

export default DraggableDialog;
