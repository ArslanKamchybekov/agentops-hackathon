from agents import Agent, WebSearchTool, handoff
from src.models.models import UserLocation

# Create specialized agents
spanish_agent = Agent(
    name="Spanish Agent", 
    instructions="Translate text into Spanish and provide cultural information about Spanish-speaking destinations."
)

french_agent = Agent(
    name="French Agent", 
    instructions="Translate text into French and provide cultural information about French-speaking destinations."
)

COUNTRY_CODE_MAPPING = {
    "Spain": "ES",
    "United States": "US",
    "France": "FR",
    "Germany": "DE",
    # Add more country mappings as needed
}

# Function to create a weather agent with specific settings
def create_weather_agent(user_location=None, search_context_size="medium"):
    # Ensure that user_location is a dictionary and add 'type'
    user_location_dict = (
        user_location.dict() if user_location else None
    )
    
    if user_location_dict:
        # Change the 'type' to 'approximate' as required by the API
        user_location_dict["type"] = "approximate"  
        
        # Convert country name to ISO 3166-1 country code
        if user_location_dict.get("country"):
            country_name = user_location_dict["country"]
            user_location_dict["country"] = COUNTRY_CODE_MAPPING.get(country_name, country_name)  # Default to country name if not mapped

    return Agent(
        name="Weather Agent",
        instructions="Find detailed weather information using web search. Provide forecasts, seasonal weather patterns, and clothing recommendations.",
        tools=[WebSearchTool(
            user_location=user_location_dict,  # Pass as dictionary with 'type' set to 'approximate'
            search_context_size=search_context_size
        )]
    )

# Create an itinerary planning agent (new)
itinerary_agent = Agent(
    name="Itinerary Agent",
    instructions="Create detailed travel itineraries based on user preferences, including daily activities, timing, and logistics."
)

# Function to create the orchestrator agent with handoffs
def create_orchestrator_agent(weather_agent):
    from agents.extensions.handoff_prompt import RECOMMENDED_PROMPT_PREFIX
    
    return Agent(
        name="Travel Assistant",
        instructions=f"""{RECOMMENDED_PROMPT_PREFIX}
        You are a comprehensive travel assistant that helps users plan their trips.
        When users need language assistance, hand off to the appropriate language agent.
        For weather information, hand off to the weather agent.
        For creating detailed itineraries, hand off to the itinerary agent.
        """,
        # Use handoffs instead of tools for delegation
        handoffs=[
            handoff(spanish_agent, tool_description_override="Transfer to Spanish specialist for translation and information about Spanish-speaking destinations"),
            handoff(french_agent, tool_description_override="Transfer to French specialist for translation and information about French-speaking destinations"),
            handoff(weather_agent, tool_description_override="Transfer to weather specialist for detailed weather information and forecasts"),
            handoff(itinerary_agent, tool_description_override="Transfer to itinerary specialist for creating detailed travel plans")
        ],
    )
