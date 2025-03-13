from fastapi import FastAPI, APIRouter
from pydantic import BaseModel
import asyncio
from agents import Runner
from src.agents.triage_agent import triage_agent

router = APIRouter()

class QueryInput(BaseModel):
    input_text: str  # Define the expected request body format

@router.get("/")
async def read_root():
    return {"Hello": "World"}

@router.post("/query")
async def query_agent(data: QueryInput):  # Accept JSON request body
    try:
        result = await Runner.run(triage_agent, input=data.input_text)
        return {"response": result.final_output}
    except Exception as e:
        return {"error": str(e)}