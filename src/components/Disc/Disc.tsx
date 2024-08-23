function Disc({
  ClassPosition,
  positionTop,
  positionLeft,
  playerColor,
}: {
  ClassPosition: string;
  positionTop?: string;
  positionLeft?: string;
  playerColor: string;
}) {
  return (
    <div
      className={`rounded-full bg-primary h-28 aspect-square ease duration-200 ${ClassPosition} ${playerColor} `}
      style={{ top: positionTop, left: positionLeft }}
    ></div>
  );
}

export default Disc;
