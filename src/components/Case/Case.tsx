function Case({ id }: { id: number }) {
  return (
    <div className="aspect-square h-36 flex justify-center items-center bg-secondary">
      <div
        className={`w-28 h-28 bg-base-100 rounded-full  flex justify-center items-center`}
      >
        {id}
      </div>
    </div>
  );
}

export default Case;
