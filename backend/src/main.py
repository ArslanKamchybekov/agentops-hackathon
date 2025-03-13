from fastapi import FastAPI
from src.routes import chat
from dotenv import load_dotenv

app = FastAPI()
load_dotenv() 

app.include_router(chat.router)