import type { Component } from "solid-js";
import { createResource, createSignal, For, Show } from "solid-js";

async function fetchDecks() {
  const url = "http://127.0.0.1:8000/decks";
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to get deck");
  }

  const alldecks = await res.json();
  return alldecks;
}

async function fetchCardList(deck_name: string) {
  const url = `http://127.0.0.1:8000/decks/${deck_name}`;
  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to get deck");
  }

  const cardList = await res.json();
  return cardList;
}

const App: Component = () => {
  var state: boolean = false;
  var deck_name: string = "";
  var count = 0;
  const [deck, setDeck] = createSignal(deck_name);
  const [toggle, setToggle] = createSignal(state);
  const [every_deck] = createResource(fetchDecks);
  const [cardList] = createResource(deck, fetchCardList);
  const [cardId, setCardId] = createSignal(count);

  return (
    <>
      <div class="flex items-center h-screen w-screen justify-evenly">
        <div class="flex items-center justify-around h-75 w-3/4 bg-slate-700 rounded-full py-4">
          <div class="flex flex-col items-center justify-center h-3/4 w-3/4 bg-slate-500 rounded-4xl mb-3">
            <div class="flex items-center justify-between h-3/4 w-full rounded-full m-0">
              <div>
                <button
                  class="ml-12"
                  onClick={() => {
                    setCardId(cardId() - 1);
                  }}
                >
                  Right
                </button>
              </div>
              <div>
                {
                  <For each={cardList()}>
                    {(card) => (
                      <Show when={cardId() === card.unique_identifier}>
                        <h2>{card.card_frontside}</h2>
                      </Show>
                    )}
                  </For>
                }
              </div>
              <div>
                <button
                  class="mr-12"
                  onClick={() => {
                    setCardId(cardId() + 1);
                  }}
                >
                  Left
                </button>
              </div>
            </div>

            <div>
              <h2>{deck()}</h2>
            </div>
          </div>
          <div class="mr-8 ml-3">
            <img
              onClick={() => {
                setToggle(() => true);
              }}
              onDblClick={() => {
                setToggle(() => false);
              }}
              class="w-12"
              src="./src/assets/FolderIcon.svg"
            />
          </div>
        </div>

        <div class="flex flex-col justify-center items-center">
          <div>
            <Show when={toggle() == true} fallback={<div></div>}>
              <div class="flex flex-col items-center">
                <div>
                  <h2 class="font-extrabold">Cards</h2>
                </div>

                <div class="flex flex-col mt-3">
                  {
                    <For each={every_deck()}>
                      {(deck) => (
                        <div>
                          {" "}
                          <h2>{deck.name}</h2>
                          <img
                            onClick={() => {
                              setDeck(() => (deck_name = deck.name));
                              deck_name == deck.name
                                ? setCardId(0)
                                : console.log();
                            }}
                            class="w-12"
                            src="./src/assets/FolderIcon.svg"
                          />
                        </div>
                      )}
                    </For>
                  }
                </div>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
