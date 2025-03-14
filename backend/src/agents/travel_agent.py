from agents import Agent, WebSearchTool, FileSearchTool

travel_agent = Agent(
    name="Travel Concierge",
    tools=[
        WebSearchTool(
            
            ),
        FileSearchTool(max_num_results=3, vector_store_ids=["VECTOR_STORE_ID"]),
    ],
)
