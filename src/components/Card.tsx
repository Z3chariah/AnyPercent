export default function Card(props: any) {
  return (
    <div class="flex justify-center h-45 w-165 items-center flex-col my-6 bg-slate-600 rounded-full">
      <h2>{props.deckName}</h2>
      <div class="flex flex-col justify-center items-center mt-12">
        <p> lorem</p>
        <button>Click Me</button>
      </div>
    </div>
  );
}
