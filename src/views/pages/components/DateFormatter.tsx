interface Props {
  date: string;
}
export function DateFormatter({ date }: Props) {
  return (
    <>
      {new Intl.DateTimeFormat("es", { dateStyle: "medium" }).format(
        new Date(date),
      )}
    </>
  );
}
