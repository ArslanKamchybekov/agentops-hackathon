"use client";
import React, { useEffect, useRef, useState } from "react";
import { Agent } from "../utils/agents";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  agent?: Agent;
  timestamp?: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  isUser,
  agent,
  timestamp = new Date(),
}) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={messageRef}
      className={cn(
        "flex w-full my-2 transition-all duration-300 ease-out",
        isUser ? "justify-end" : "justify-start",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl",
          isUser
            ? "bg-primary text-primary-foreground"
            : agent?.color || "bg-muted border border-border"
        )}
      >
        {!isUser && agent && (
          <div className="flex items-center mb-1 space-x-1">
            <span className="text-sm font-medium">{agent.name}</span>
            <span>{agent.flag}</span>
          </div>
        )}
        <p className="text-base leading-relaxed">{content}</p>
        <div className="text-right">
          <span className="text-xs opacity-70">
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
