from agents import Agent, function_tool

@function_tool
async def fetch_weather(location: str) -> str:
    """Fetch the weather for a given location."""
    # In real life, this would be a call to a weather API
    return f"The weather in {location} is sunny."

weather_agent = Agent(
    name="Weather Agent",
    tools=[fetch_weather],  # Custom function tool for fetching weather
)
