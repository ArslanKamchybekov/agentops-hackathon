from fastapi import APIRouter, HTTPException
from agents import Runner
from src.models.models import QueryInput, UserLocation
from src.agents.agents import create_weather_agent, create_orchestrator_agent

router = APIRouter()

@router.get("/")
async def read_root():
    return {"Hello": "World"}

@router.post("/query")
async def query_agent(query_input: QueryInput):
    try:
        # Create user location if city and country are provided
        user_location = (
            UserLocation(city=query_input.city, country=query_input.country)
            if query_input.city and query_input.country
            else None
        )
        
        # Create the weather agent with WebSearchTool
        weather_agent = create_weather_agent(
            user_location=user_location,
            search_context_size=query_input.search_context_size
        )
        
        # Create the orchestrator agent with handoffs
        orchestrator_agent = create_orchestrator_agent(weather_agent)
        
        # Run the query using the correct parameter name
        result = await Runner.run(starting_agent=orchestrator_agent, input=query_input.input_text)
        
        return {"response": result.final_output}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
