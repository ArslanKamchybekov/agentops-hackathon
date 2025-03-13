from agents import Agent, Runner
from .english_agent import english_agent
from .spanish_agent import spanish_agent

triage_agent = Agent(
    name="Triage Agent",
    instructions="Determine the language and hand off to the correct agent.",
    handoffs=[english_agent, spanish_agent]
)
