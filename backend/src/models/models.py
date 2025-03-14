from pydantic import BaseModel
from typing import Optional, Literal

# Define the UserLocation class
class UserLocation(BaseModel):
    city: str
    country: str

# Define the query input model
class QueryInput(BaseModel):
    input_text: str
    city: Optional[str] = None
    country: Optional[str] = None
    search_context_size: Optional[Literal["low", "medium", "high"]] = "medium"