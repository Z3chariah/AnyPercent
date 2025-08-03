import { createSignal } from "solid-js";
import Deck from "./Deck";
export default function Parent(props: any) {
  const [message, setMessage] = createSignal("");

  return (
    <div class="flex justify-center h-45 w-165 items-center flex-col my-2">
      <img
        onClick={() => setMessage(props.deck_name)}
        class="w-12"
        src="./src/assets/FolderIcon.svg"
      />

      <h2>{props.deck_name}</h2>

      <Deck deck_name={message()} />
    </div>
  );
}
