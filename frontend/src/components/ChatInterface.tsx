"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import TypingIndicator from "@/components/TypingIndicator";
import LanguageSelector from "./LanguageSelector";
import { useChat } from "@/app/hooks/useChat";

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState("");
  const { messages, currentAgent, isTyping, sendMessage, changeLanguage } =
    useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto bg-background rounded-2xl shadow-lg border border-border overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-lg font-medium">Travel Concierge</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {currentAgent.flag} {currentAgent.name}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            content={message.content}
            isUser={message.isUser}
            agent={message.agent}
            timestamp={message.timestamp}
          />
        ))}
        {isTyping && (
          <div className="flex">
            <div className={`${currentAgent.color} rounded-2xl`}>
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t">
        <LanguageSelector
          currentLanguage={currentAgent.language}
          onSelectLanguage={changeLanguage}
        />

        <form onSubmit={handleSubmit} className="flex items-center p-4">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about travel destinations..."
            className="flex-1 bg-muted border-0 focus:ring-0 rounded-full px-4 py-2 focus:outline-none"
          />
          <button
            type="submit"
            className="ml-2 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors"
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
