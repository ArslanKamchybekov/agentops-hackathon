"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { queryWeather } from "@/app/api/query/route"
import WeatherDisplay from "@/components/WeatherDisplay"

export default function WeatherQueryPage() {
  const [inputText, setInputText] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [searchContextSize, setSearchContextSize] = useState("medium")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await queryWeather({
        input_text: inputText,
        city: city || undefined,
        country: country || undefined,
        search_context_size: searchContextSize,
      })

      setResponse(result.response)
    } catch (error) {
      console.error("Error querying weather:", error)
      setResponse("Error: Failed to get response from the server")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>AgentOps OpenAISDK Handoff Multiagent</CardTitle>
          <CardDescription>Ask about weather conditions, forecasts, and travel recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inputText">Query</Label>
              <Input
                id="inputText"
                placeholder="What's the weather like in New York?"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City (Optional)</Label>
                <Input id="city" placeholder="New York" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country (Optional)</Label>
                <Input id="country" placeholder="USA" value={country} onChange={(e) => setCountry(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="searchContextSize">Search Context Size</Label>
              <Select value={searchContextSize} onValueChange={setSearchContextSize}>
                <SelectTrigger id="searchContextSize">
                  <SelectValue placeholder="Select context size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Querying..." : "Submit Query"}
            </Button>
          </form>
        </CardContent>

        {response && (
          <CardFooter className="flex flex-col items-start">
            <h3 className="font-medium mb-2">Response:</h3>
            <div className="w-full">
              {response.startsWith("Error") ? (
                <div className="p-4 bg-red-50 text-red-800 rounded-md">{response}</div>
              ) : (
                <WeatherDisplay markdown={response} />
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

