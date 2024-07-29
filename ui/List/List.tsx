export interface Props<T> {
  data: T[];
}

function List<T, K>({ data }: Props<T>) {
  return (
    <div>
      {data.map((item) => {
        return <div></div>;
      })}
    </div>
  );
}

export default List;
