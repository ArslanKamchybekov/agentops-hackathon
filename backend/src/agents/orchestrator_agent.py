from agents import Agent, WebSearchTool, Runner, Tool
from pydantic import BaseModel
from typing import Optional, Literal


# Define the UserLocation class
class UserLocation(BaseModel):
    city: str
    country: str


# Define ExtendedWebSearchTool that supports location and context size
class ExtendedWebSearchTool(Tool):
    user_location: Optional[UserLocation] = None
    search_context_size: Literal["low", "medium", "high"] = "medium"

    def __init__(self, user_location: Optional[UserLocation] = None, search_context_size: Literal["low", "medium", "high"] = "medium"):
        self.user_location = user_location
        self.search_context_size = search_context_size
        super().__init__()

    async def search(self, query: str):
        """
        Perform the search with the given query. Customizes the search with the user's location and context size.

        Args:
            query: The search query text.
        """
        location_info = (
            f"Location: {self.user_location.city}, {self.user_location.country}"
            if self.user_location
            else "Location: Not specified"
        )
        
        context_size_info = f"Context size: {self.search_context_size}"

        # Combine the query with location and context size
        customized_query = f"{query}\n{location_info}\n{context_size_info}"

        # Simulate a web search result based on the customized query
        search_results = [f"Search result for: {customized_query}"]

        return search_results


# Define the Orchestrator Agent
spanish_agent = Agent(name="Spanish Agent", instructions="Translate text into Spanish.")
french_agent = Agent(name="French Agent", instructions="Translate text into French.")
weather_agent = Agent(name="Weather Agent", tools=[ExtendedWebSearchTool()])  # Using ExtendedWebSearchTool

orchestrator_agent = Agent(
    name="Orchestrator Agent",
    instructions="Orchestrates tasks using other agents as tools.",
    tools=[
        spanish_agent.as_tool(tool_name="translate_to_spanish"),
        french_agent.as_tool(tool_name="translate_to_french"),
        weather_agent.as_tool(tool_name="fetch_weather"),
    ],
)
