import agentops
from fastapi import FastAPI
from src.routes import router
from dotenv import load_dotenv

app = FastAPI()
load_dotenv() 
agentops.init(api_key="51b2e958-dfda-4f84-82a0-4281f9397547")

app.include_router(router.router)