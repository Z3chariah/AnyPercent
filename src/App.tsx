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
      <For each={every_deck()}>
        {(deck) => (
          <Show when={every_deck()} fallback={<p>loading...</p>}>
            <div class="c-container">
              <div class="card">
                <h1 class="text-2xl">{deck.name}</h1>
                <div class="card-items">
                  <p>lorum what not</p>
                </div>
              </div>
            </div>
          </Show>
        )}
      </For>
    </>
  );
};

export default App;
