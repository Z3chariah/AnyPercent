from enum import IntEnum
from pydantic import BaseModel, Field
from typing import Optional


class Priority(IntEnum):
    Low = 1
    Medium = 5
    High = 10
    Highest = 15

class FlashCard(BaseModel):
    card_frontside: str = Field(..., min_length=1, description="This is the front-side of a flash card.")
    card_backside: str = Field(..., min_length=1, description="This is the back-side of a flash card.")
    priority: Priority = Field(description="This is the user defined priority state.", default=Priority.Highest)



class Card(FlashCard):
    unique_identifier: int = Field(description="this is the unique identifier for a card.")



class UpdateCard(BaseModel):
    card_frontside: Optional[str] = Field(..., min_length=1, description="This is the front-side of a flash card.")
    card_backside: Optional[str] = Field(..., min_length=1, description="This is the back-side of a flash card.")
    priority: Priority = Field(description="This is the user defined priority state.", default=Priority.Highest)


class CreateCard(FlashCard):
    pass



class Deck(BaseModel):
    card_list_ds: list[Card] = Field(..., min_length=1, max_length=100, description="this is a deck of cards")
    name: str = Field(..., min_length=1, description="This is the user generated title of a deck. All titles made by the programmer are example names which will be deleted and modified by the user")


class UpdateDeck(BaseModel):
    card_list_ds: Optional[list[Card]] = Field(..., min_length=1, max_length=100, description="this is a deck of cards")
    name: Optional[str] = Field(..., min_length=1, description="This is the user generated title of a deck. All titles made by the programmer are example names which will be deleted and modified by the user")

class CreateDeck(Deck):
    pass

class UserDeck(Deck):
     deck_id: int = Field(description="this is the unique identifier for a deck.")
