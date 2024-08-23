function Case({
  id,
  onHover,
  onClick,
  DiscPlayed,
  playerColor,
}: {
  id: number;
  onHover: React.MouseEventHandler<HTMLDivElement>;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  DiscPlayed: boolean;
  playerColor: string;
}) {
  return (
    <div
      className="aspect-square h-36 flex justify-center items-center bg-secondary"
      onMouseOver={onHover}
      onClick={onClick}
    >
      <div
        className={`w-28 h-28 ${
          !DiscPlayed ? "bg-base-100" : playerColor
        } rounded-full  flex justify-center items-center`}
      ></div>
    </div>
  );
}

export default Case;
