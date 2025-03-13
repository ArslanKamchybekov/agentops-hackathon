from agents import Agent, Runner, function_tool

@function_tool
def get_weather(city: str) -> str:
    return f"The weather in {city} is sunny."

weather_agent = Agent(
    name="WeatherBot",
    instructions="Provide weather updates.",
    tools=[get_weather],
)
