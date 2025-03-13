from agents import Agent

class BaseAgent(Agent):
    def __init__(self, name, instructions):
        super().__init__(name=name, instructions=instructions)
