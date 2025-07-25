import type { Component } from "solid-js";
import { createResource, For, Show } from "solid-js";
import Card from "./components/Card";

const fetchCards = async () => {
  const res = await fetch("http://127.0.0.1:8000/decks");

  return res.json();
};
const App: Component = () => {
  const [decks] = createResource(fetchCards);

  return (
    <>
      <For each={decks()}>
        {(deck) => (
          <Show when={decks()} fallback={<p>loading...</p>}>
            <div>
              <Card deck_name={deck.name} />
            </div>
          </Show>
        )}
      </For>
    </>
  );
};

export default App;
