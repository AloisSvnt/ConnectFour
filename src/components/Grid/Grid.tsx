import Case from "../Case/Case";

function Grid() {
  return (
    <div className="grid grid-rows-6 grid-cols-7 max-w-7xl aspect-[7/6] margin-auto">
      {Array.from({ length: 42 }).map((_, index) => (
        <Case key={index} id={index} />
      ))}
    </div>
  );
}

export default Grid;
