function Disc({
  ClassPosition,
  positionTop,
  positionLeft,
}: {
  ClassPosition?: string;
  positionTop?: string;
  positionLeft?: string;
}) {
  return (
    <div
      className={`rounded-full bg-primary h-28 aspect-square ease duration-200 ${ClassPosition}`}
      style={{ top: positionTop, left: positionLeft }}
    ></div>
  );
}

export default Disc;
