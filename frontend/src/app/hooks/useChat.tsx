"use client"

import { useState, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import { queryWeather } from "@/app/api/query/route"

// Define types
export type Agent = {
  name: string
  language: string
  flag: string
  color: string
}

export type Message = {
  id: string
  content: string
  isUser: boolean
  agent: Agent
  timestamp: Date
}

// Available agents
const agents: Record<string, Agent> = {
  english: {
    name: "English Assistant",
    language: "english",
    flag: "🇺🇸",
    color: "bg-blue-100",
  },
  spanish: {
    name: "Asistente Español",
    language: "spanish",
    flag: "🇪🇸",
    color: "bg-yellow-100",
  },
  french: {
    name: "Assistant Français",
    language: "french",
    flag: "🇫🇷",
    color: "bg-red-100",
  },
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: "Hello! I'm your travel concierge. How can I help you today?",
      isUser: false,
      agent: agents.english,
      timestamp: new Date(),
    },
  ])
  const [currentAgent, setCurrentAgent] = useState<Agent>(agents.english)
  const [isTyping, setIsTyping] = useState(false)

  // Extract location from message if possible
  const extractLocation = (message: string): { city?: string; country?: string } => {
    // This is a simple implementation - in a real app, you'd use NLP or regex patterns
    const cityMatch = message.match(/in\s+([A-Za-z\s]+)(?:,|\s+in|\s+of|\s+at)/i)
    const countryMatch = message.match(/(?:,|in|of|at)\s+([A-Za-z\s]+)$/i)

    return {
      city: cityMatch ? cityMatch[1].trim() : undefined,
      country: countryMatch ? countryMatch[1].trim() : undefined,
    }
  }

  // Determine if a message is a weather query
  const isWeatherQuery = (message: string): boolean => {
    const weatherKeywords = [
      "weather",
      "temperature",
      "forecast",
      "rain",
      "sunny",
      "cloudy",
      "hot",
      "cold",
      "warm",
      "climate",
    ]

    return weatherKeywords.some((keyword) => message.toLowerCase().includes(keyword))
  }

  const sendMessage = useCallback(
    async (content: string) => {
      // Add user message
      const userMessage: Message = {
        id: uuidv4(),
        content,
        isUser: true,
        agent: currentAgent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsTyping(true)

      try {
        let responseContent = ""

        // Check if it's a weather query
        if (isWeatherQuery(content)) {
          const { city, country } = extractLocation(content)

          // Use the server action instead of direct fetch
          const result = await queryWeather({
            input_text: content,
            city,
            country,
            search_context_size: "medium", // Use string value directly
          })

          responseContent = result.response
        } else {
          // For non-weather queries, you could use a different API or fallback response
          responseContent = `As your travel concierge, I'd be happy to help with your travel plans. ${content.includes("?") ? "Could you provide more details about your destination or specific travel needs?" : "What specific information are you looking for?"}`

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }

        // Add assistant response
        const assistantMessage: Message = {
          id: uuidv4(),
          content: responseContent,
          isUser: false,
          agent: currentAgent,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch (error) {
        console.error("Error sending message:", error)

        // Add error message
        const errorMessage: Message = {
          id: uuidv4(),
          content: "Sorry, I encountered an error. Please try again later.",
          isUser: false,
          agent: currentAgent,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsTyping(false)
      }
    },
    [currentAgent],
  )

  const changeLanguage = useCallback((language: string) => {
    const newAgent = agents[language] || agents.english
    setCurrentAgent(newAgent)

    // Add system message about language change
    const systemMessage: Message = {
      id: uuidv4(),
      content: `Switched to ${newAgent.name}`,
      isUser: false,
      agent: newAgent,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, systemMessage])
  }, [])

  return {
    messages,
    currentAgent,
    isTyping,
    sendMessage,
    changeLanguage,
  }
}

