import type { Component } from "solid-js";
import { createResource, For } from "solid-js";

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
  const [every_deck] = createResource(fetchDecks);

  return (
    <>
      <div class="flex flex-col items-center h-screen w-screen justify-center">
        <div class="flex items-center justify-between h-fit w-3/4 bg-slate-700 rounded-full flex-col">
          <div class="flex items-center justify-between h-32 w-full bg-slate-500 rounded-full px-6 mb-3">
            <div>
              <h2 class="ml-28">Card Box</h2>
            </div>

            <div>
              <img
                onClick={() => {
                  {
                    console.log("You've Clicked Me!");
                  }
                }}
                class="w-12"
                src="./src/assets/FolderIcon.svg"
              />
            </div>
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
