import { useParams } from "react-router-dom";

export default function DrawPage() {
  const params = useParams();
  console.log(params);
  return <div>{params.id}</div>;
}
