import type { Component } from "solid-js";
import { createResource, createSignal, For, Show } from "solid-js";
import Card from "./components/Card";

async function fetchDecks() {
  const url = "http://127.0.0.1:8000/decks";
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to get deck");
  }

  const alldecks = await res.json();
  return alldecks;
}

const App: Component = () => {
  var state = 0;
  const [deck, setDeck] = createSignal("English");
  const [toggle, setToggle] = createSignal(false);
  const [every_deck] = createResource(fetchDecks);

  return (
    <>
      <div class="flex items-center h-screen w-screen justify-evenly">
        <div class="flex items-center justify-between h-fit w-3/4 bg-slate-700 rounded-full flex-col">
          <div class="flex items-center justify-between h-32 w-full bg-slate-500 rounded-full px-6 mb-3">
            <div>
              <h2 class="ml-28">{deck()}</h2>
            </div>

            <div>
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
                              setDeck(deck.name);
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
{
  /*<For each={every_deck()}>
  {(deck) => <Deck deck_name={deck.name} deck_id={deck.deck_id} />}
</For>*/
}
