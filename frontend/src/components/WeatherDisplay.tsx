import React from "react"
import { Card } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import { Cloud, CloudSun, Sun, CloudRain, Wind, Thermometer, Calendar } from 'lucide-react'

interface WeatherDisplayProps {
  markdown: string
}

// Helper function to get weather icon based on description
const getWeatherIcon = (description: string) => {
  const desc = description.toLowerCase()
  if (desc.includes("sunny")) return <Sun className="h-5 w-5 text-yellow-500" />
  if (desc.includes("partly") && (desc.includes("sunny") || desc.includes("cloud"))) 
    return <CloudSun className="h-5 w-5 text-blue-400" />
  if (desc.includes("cloud")) return <Cloud className="h-5 w-5 text-gray-400" />
  if (desc.includes("rain") || desc.includes("shower")) return <CloudRain className="h-5 w-5 text-blue-500" />
  if (desc.includes("wind")) return <Wind className="h-5 w-5 text-gray-500" />
  return <Thermometer className="h-5 w-5 text-red-400" />
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ markdown }) => {
  // Parse the markdown to extract current conditions and forecast
  const lines = markdown.split('\n')
  
  // Extract current weather info
  const currentWeatherLine = lines.find(line => line.includes('Current Conditions:'))
  const currentWeather = currentWeatherLine ? currentWeatherLine.replace('Current Conditions:', '').trim() : ''
  
  // Extract forecast days
  const forecastLines = lines.filter(line => line.startsWith('*'))
  const forecast = forecastLines.map(line => {
    const parts = line.replace('*', '').trim().split(':')
    const day = parts[0].trim()
    const details = parts[1].trim()
    
    // Extract temperature and description
    const tempMatch = details.match(/(Low: .+?°[CF]), (High: .+?°[CF])/)
    const descMatch = details.match(/Description: (.+)/)
    
    return {
      day,
      low: tempMatch ? tempMatch[1] : '',
      high: tempMatch ? tempMatch[2] : '',
      description: descMatch ? descMatch[1] : '',
    }
  })
  
  // Extract location and time
  const locationMatch = markdown.match(/in (.+?),/)
  const location = locationMatch ? locationMatch[1] : 'Unknown Location'
  
  const timeMatch = markdown.match(/As of (.+?) on/)
  const time = timeMatch ? timeMatch[1] : ''
  
  const dateMatch = markdown.match(/on (.+?),/)
  const date = dateMatch ? dateMatch[1] : ''

  return (
    <div className="space-y-4">
      {/* Current Weather Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{location}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{time} {date}</p>
          </div>
          {getWeatherIcon(currentWeather)}
        </div>
        
        <div className="mt-4">
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 mr-2 text-red-500" />
            <p className="text-xl font-semibold">{currentWeather}</p>
          </div>
        </div>
      </Card>
      
      {/* 7-Day Forecast */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          7-Day Forecast
        </h3>
        
        <div className="space-y-3">
          {forecast.map((day, index) => (
            <div key={index} className="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="w-1/4 font-medium">{day.day}</div>
              <div className="w-1/4 text-sm">
                <span className="text-blue-500">{day.low}</span>
              </div>
              <div className="w-1/4 text-sm">
                <span className="text-red-500">{day.high}</span>
              </div>
              <div className="w-1/4 flex items-center">
                {getWeatherIcon(day.description)}
                <span className="ml-1 text-xs text-gray-600 dark:text-gray-400 hidden sm:inline">
                  {day.description.length > 20 
                    ? `${day.description.substring(0, 20)}...` 
                    : day.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Note */}
      <p className="text-sm text-gray-500 italic">
        Please note that weather conditions can change rapidly. For the most current information, 
        it&apos;s advisable to check a reliable weather service before your trip.
      </p>
      
      {/* Original markdown (hidden by default) */}
      <details className="mt-4">
        <summary className="text-sm text-gray-500 cursor-pointer">Show raw data</summary>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md mt-2">
          <ReactMarkdown>
            {markdown}
          </ReactMarkdown>
        </div>
      </details>
    </div>
  )
}

export default WeatherDisplay
