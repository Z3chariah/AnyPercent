import { createResource, createSignal, For, Show } from "solid-js";

export default function Card(props: any) {
  return <h2 class="bg-pink-300">{props.deck_name}</h2>;
}
