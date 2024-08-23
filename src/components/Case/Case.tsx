function Case({
  id,
  onHover,
}: {
  id: number;
  onHover: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className="aspect-square h-36 flex justify-center items-center bg-secondary"
      onMouseOver={onHover}
    >
      <div
        className={`w-28 h-28 bg-base-100 rounded-full  flex justify-center items-center`}
      >
        {id}
      </div>
    </div>
  );
}

export default Case;
