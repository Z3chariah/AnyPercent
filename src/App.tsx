import type { Component } from "solid-js";
import { createResource, For, Show } from "solid-js";
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
  const [every_deck] = createResource(fetchDecks);

  return (
    <>
      <div class="flex flex-col items-end h-screen w-screen justify-center">
        <div class="flex  items-center h-fit w-2/3 bg-slate-300 flex-nowrap overflow-scroll">
          <For each={every_deck()}>
            {(deck) => <Card deckName={deck.name} />}
          </For>
        </div>
      </div>
    </>
  );
};

export default App;
