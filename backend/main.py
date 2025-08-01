from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from cards import Card, UserDeck, Priority, CreateDeck, CreateCard, UpdateCard, UpdateDeck
api = FastAPI()


all_decks = [
    UserDeck(name="Neurological Structures",
        card_list_ds=[
            Card(card_frontside= "Prefrontal Cortex", card_backside = "The area responsible for Decision-Making and Critical-Thinking", unique_identifier = 1, priority = Priority.Low)], deck_id=1),
    UserDeck(name="Pharmacology",
        card_list_ds=[
            Card(card_frontside= "Prefrontal Cortex", card_backside = "The area responsible for Decision-Making and Critical-Thinking", unique_identifier = 1, priority = Priority.Low)], deck_id=2),
    UserDeck(name="Anatomy & Physio",
        card_list_ds=[
            Card(card_frontside= "Prefrontal Cortex", card_backside = "The area responsible for Decision-Making and Critical-Thinking", unique_identifier = 1, priority = Priority.Low)], deck_id=3),
    UserDeck(name="Pathology",
        card_list_ds=[
            Card(card_frontside= "Prefrontal Cortex", card_backside = "The area responsible for Decision-Making and Critical-Thinking", unique_identifier = 1, priority = Priority.Low)], deck_id=4),
    UserDeck(name=" Linear alg",
        card_list_ds=[
            Card(card_frontside= "Prefrontal Cortex", card_backside = "The area responsible for Decision-Making and Critical-Thinking", unique_identifier = 1, priority = Priority.Low)], deck_id=5)


]



def instantiate_user_card(all_decks: list[UserDeck], deck_id: int, card_id: int) -> Card | None:

    for deck in all_decks:
        if deck_id == deck.deck_id:
            for i, card in enumerate(deck.card_list_ds):
             try:
                if card_id == card.unique_identifier:
                    return card
             except Exception:
                HTTPException(status_code=404, detail=print(f'Failed to find {card}! Please try again later.'))


origins = [
    "http://localhost:3000"

]

api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@api.get('/decks', response_model=List[UserDeck])
def get_decks():
 return all_decks


@api.get('/decks/{deck_name}', response_model= List[Card], response_description="Allow's users to see a list of cards from a specific deck")
def get_deck(deck_name: str = ""):
      for deck in all_decks:
          if deck.name == deck_name:
              return deck.card_list_ds


@api.delete('/decks/{deck_name}', response_model=UserDeck)
def delete_deck(deck_name: str):
    for index, deck in enumerate (all_decks):
        if deck.name ==deck_name:
            deleted_deck = all_decks.remove(deck)
            return deleted_deck

@api.post('/decks/{deck_id}', response_model= Card)
def create_card(deck_id: int, card: CreateCard):

    for deck in all_decks:

        if deck.deck_id == deck_id:
            new_unique_identifier = max(card.unique_identifier for card in deck.card_list_ds) + 1
            new_card = Card (
                card_frontside = card.card_frontside,
                card_backside = card.card_backside,
                priority = card.priority,
                unique_identifier = new_unique_identifier)

            try:
                deck.card_list_ds.append(new_card)
                return new_card
            except Exception:
                HTTPException(status_code=404, detail=print(f'Failed to add {card} to {deck}'))



@api.post("/decks", response_model=UserDeck, response_description="Allow's users to create their own flashcard deck. Iterates it's Identifier, based on the capicity of the datastructure 'all_decks' and requires you add a minimum of one card.")
def create_deck(deck: CreateDeck):
    new_deck_id = max(deck.deck_id for deck in all_decks) + 1
    new_deck = UserDeck (
        deck_id = new_deck_id,
        card_list_ds = deck.card_list_ds,
        name = deck.name
    )
    try:
        all_decks.append(new_deck)
        return new_deck
    except Exception:
        HTTPException(status_code=404, detail=print(f'Failed to create deck: {deck}'))


@api.delete("/decks/{deck_id}/{card_id}", response_model = Card, response_description="This is the response for a deleted card")
def delete_card(deck_id: int, card_id: int):
    card = instantiate_user_card(all_decks, deck_id, card_id)

    if card is not None:
      deleted_card = all_decks[deck_id].card_list_ds.remove(card)
      return deleted_card


@api.put("/decks/{deck_id}/{card_id}", response_model=Card, response_description="Find's the desired card and allow's users to update all attributes outside of the unique identifier.")
def update_card(deck_id: int, card_id: int, updated_card: UpdateCard):
    card = instantiate_user_card(all_decks, deck_id, card_id)



    try:
        card.unique_identifier = card_id
        card.card_frontside = updated_card.card_frontside
        card.card_backside = updated_card.card_backside
        return card
    except Exception:
          HTTPException(status_code=404, detail=print(f'Failed to update card: {card}'))


@api.put("/decks/{deck_name}", response_model=Card, response_description="Find's the desired card and allow's users to update all attributes outside of the unique identifier.")
def update_deck(deck_name: str, updated_deck: UpdateDeck):
    for deck in all_decks:
        if deck.name == deck_name:
            try:
                if updated_deck.name is not None:
                    deck.name = updated_deck.name
                if updated_deck.card_list_ds is not None:
                    deck.card_list_ds = updated_deck.card_list_ds
                    deck.deck_id = deck.deck_id
                    return deck
            except Exception:
                HTTPException(status_code=404, detail=print(f'Failed to update card: {deck}'))
