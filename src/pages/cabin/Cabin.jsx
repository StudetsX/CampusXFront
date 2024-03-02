// libs
import {useContext} from "react";
import { useParams } from "react-router-dom";

// context
import { UserContext } from "../../contexts/UserContext";

function Cabin() {
  const {id} = useParams();
  const { user } = useContext(UserContext);
  return (
    <><div></div></>
  )
}


function ChoiceBar(){
  return <></>
}

export default Cabin