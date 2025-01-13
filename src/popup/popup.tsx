import React from "react";
import ReactDOM from "react-dom";
import "../styles/global.css";

const App: React.FC<{}> = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1>Popup Page</h1>
      <img src="icon128.png" className="w-16 h-16 object-contain" alt="extension icon"/>
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
