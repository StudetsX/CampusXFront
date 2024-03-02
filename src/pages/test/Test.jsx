// libs
import { useParams } from "react-router-dom";

// comps


function Test() {
  const {id} = useParams();
  return (
    <div>Test{id}</div>
  )
}

export default Test