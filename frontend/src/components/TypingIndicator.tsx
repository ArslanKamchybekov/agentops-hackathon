import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex space-x-1 items-center py-2 px-3">
      <div
        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );
};

export default TypingIndicator;
