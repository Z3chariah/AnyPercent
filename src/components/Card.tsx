export default function Card(props: any) {
  return (
    <div class="flex justify-center h-45 w-165 items-center flex-col my-2">
      <img class="w-12" src="./src/assets/FolderIcon.svg"></img>

      <h2>{props.deckName}</h2>
    </div>
  );
}
