"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Agent, Language, getAgentByLanguage } from "@/utils/agents";

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  agent?: Agent;
  timestamp: Date;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentAgent, setCurrentAgent] = useState<Agent>(
    getAgentByLanguage("english")
  );
  const [isTyping, setIsTyping] = useState(false);
  const messageIdCounter = useRef(0);

  // Add initial greeting from the main agent
  useEffect(() => {
    const initialGreeting: Message = {
      id: `msg-${messageIdCounter.current++}`,
      content: currentAgent.greeting,
      isUser: false,
      agent: currentAgent,
      timestamp: new Date(),
    };

    setMessages([initialGreeting]);
  }, []);

  // Handle language change
  const changeLanguage = useCallback((language: Language) => {
    const newAgent = getAgentByLanguage(language);
    setCurrentAgent(newAgent);

    // Add a transition message
    if (language !== "english") {
      // Add a handoff message from the English agent
      const handoffMessage: Message = {
        id: `msg-${messageIdCounter.current++}`,
        content: `Let me connect you with our ${language} specialist, ${newAgent.name}.`,
        isUser: false,
        agent: getAgentByLanguage("english"),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, handoffMessage]);

      // Simulate typing indicator
      setIsTyping(true);

      // Add a greeting from the new agent after a delay
      setTimeout(() => {
        const greetingMessage: Message = {
          id: `msg-${messageIdCounter.current++}`,
          content: newAgent.greeting,
          isUser: false,
          agent: newAgent,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, greetingMessage]);
        setIsTyping(false);
      }, 2000);
    }
  }, []);

  // Send a message
  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim()) return;

      // Add user message
      const userMessage: Message = {
        id: `msg-${messageIdCounter.current++}`,
        content,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // Simulate typing indicator
      setIsTyping(true);

      // Simulate response based on simple keywords
      setTimeout(() => {
        // In a real implementation, this would be an API call to a language model
        let responseContent = "";

        // Simple response logic based on keywords - in a real app this would be an API call
        if (
          content.toLowerCase().includes("hello") ||
          content.toLowerCase().includes("hi")
        ) {
          responseContent = `Hello there! How can I help with your travel plans?`;
        } else if (
          content.toLowerCase().includes("france") ||
          content.toLowerCase().includes("paris")
        ) {
          if (currentAgent.language !== "french") {
            // Switch to French agent
            changeLanguage("french");
            setIsTyping(false);
            return;
          } else {
            responseContent = `Paris is beautiful in the spring! Would you like recommendations for the top attractions or some hidden gems?`;
          }
        } else if (
          content.toLowerCase().includes("spain") ||
          content.toLowerCase().includes("barcelona")
        ) {
          if (currentAgent.language !== "spanish") {
            // Switch to Spanish agent
            changeLanguage("spanish");
            setIsTyping(false);
            return;
          } else {
            responseContent = `Barcelona is known for its stunning architecture and vibrant culture. Are you interested in Gaudí's works or the local cuisine?`;
          }
        } else if (
          content.toLowerCase().includes("japan") ||
          content.toLowerCase().includes("tokyo")
        ) {
          if (currentAgent.language !== "japanese") {
            // Switch to Japanese agent
            changeLanguage("japanese");
            setIsTyping(false);
            return;
          } else {
            responseContent = `Tokyo is a fascinating blend of traditional and ultramodern! Are you planning to visit during cherry blossom season?`;
          }
        } else {
          responseContent = `I'd be happy to help with that! Could you provide more details about your travel plans?`;
        }

        const agentResponse: Message = {
          id: `msg-${messageIdCounter.current++}`,
          content: responseContent,
          isUser: false,
          agent: currentAgent,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, agentResponse]);
        setIsTyping(false);
      }, 1500);
    },
    [currentAgent, changeLanguage]
  );

  return {
    messages,
    currentAgent,
    isTyping,
    sendMessage,
    changeLanguage,
  };
}
