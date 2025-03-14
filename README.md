# Travel Assistant Agent System

## Overview

The Travel Assistant Agent System is a FastAPI application that uses an orchestrator agent with specialized sub-agents to assist users with various travel-related tasks. The system leverages agent handoffs to delegate specialized tasks to the appropriate agent, creating a smooth and efficient user experience.

## Architecture

The system is built around four main components:

1. **FastAPI Application**: Handles HTTP requests and responses
2. **Orchestrator Agent**: Coordinates tasks and delegates to specialized agents
3. **Specialized Agents**: Handle specific tasks like weather information, translations, and itinerary planning
4. **WebSearchTool**: Fetches up-to-date information from the web

### File Structure

```
travel-assistant/
├── main.py              # Application entry point
├── models.py            # Data models and schemas
├── agents.py            # Agent definitions and factory functions
├── router.py            # API endpoint definitions
└── test_app.py          # Tests for the application
```

## Agent Workflow

1. The user sends a request to the `/query` endpoint with their query and optional location information
2. The FastAPI application processes the request and initializes the appropriate agents
3. The orchestrator agent analyzes the user's query and determines which specialized agent should handle it
4. Using the handoff system, the orchestrator delegates the task to the specialized agent
5. The specialized agent processes the request using its own tools and capabilities
6. The result is returned to the user

### Specialized Agents

1. **Weather Agent**
   - Uses WebSearchTool to fetch current weather information
   - Provides forecasts and weather-related travel advice
   - Customizable by location and search context size

2. **Spanish Agent**
   - Translates text into Spanish
   - Provides cultural information about Spanish-speaking destinations

3. **French Agent**
   - Translates text into French
   - Provides cultural information about French-speaking destinations

4. **Itinerary Agent**
   - Creates detailed travel itineraries based on user preferences
   - Plans activities, timings, and logistics

## Handoff System

The handoff system allows seamless delegation of tasks between agents:

1. When a user's query requires specialized knowledge, the orchestrator agent initiates a handoff
2. The handoff includes relevant context from the conversation
3. The specialized agent takes over and processes the request
4. Results are delivered back to the user as if coming from a single assistant

## API Usage

### Query Endpoint

**POST** `/query`

Request body:
```json
{
  "input_text": "What's the weather like in Barcelona?",
  "city": "Barcelona",
  "country": "Spain",
  "search_context_size": "high"
}
```

- `input_text`: The user's query (required)
- `city`: City for location-aware searches (optional)
- `country`: Country for location-aware searches (optional)
- `search_context_size`: Amount of context for web searches - "low", "medium", or "high" (optional, default: "medium")

Response:
```json
{
  "response": "The weather in Barcelona this week is sunny with temperatures ranging from 22°C to 28°C..."
}
```

## Example Queries

1. **Weather Information**
   ```
   "What's the weather like in Barcelona for the next week? I'm planning a trip there."
   ```

2. **Language Translation**
   ```
   "How do I ask for directions to the Eiffel Tower in French?"
   ```

3. **Itinerary Planning**
   ```
   "I'm visiting Tokyo for 3 days and want to see the major attractions. Can you create an itinerary for me?"
   ```

4. **Complex Query (Multiple Handoffs)**
   ```
   "I'm planning a 5-day trip to Rome in July. I'd like to know what the weather will be like, some basic Italian phrases I should know, and a suggested itinerary."
   ```

## Setup and Deployment

1. Install dependencies:
   ```bash
   pip install fastapi uvicorn agents-sdk pydantic
   ```

2. Run the application:
   ```bash
   uvicorn main:app --reload
   ```

3. Access the API documentation:
   ```
   http://localhost:8000/docs
   ```

## Testing

Run the tests using pytest:
```bash
pytest test_app.py -v
```

Manual testing can be done using the FastAPI Swagger UI or curl commands.
