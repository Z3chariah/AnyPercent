import { createSignal, createResource, For, Show } from "solid-js";

async function fetchCards(deck_name: string) {
  const url = `http://127.0.0.1:8000/decks/${deck_name}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to get deck");
  }

  const allcards = await res.json();

  return allcards;
}

export default function Card(props: any) {
  const [deckName, setDeckName] = createSignal("");
  const [deck] = createResource(deckName, fetchCards);
  return (
    <div class="flex justify-center h-45 w-165 items-center flex-col my-2">
      <img
        onClick={() => {
          setDeckName(props.deck_name);
        }}
        class="w-12"
        src="./src/assets/FolderIcon.svg"
      ></img>

      <h2>{props.deck_name}</h2>
    </div>
  );
}
