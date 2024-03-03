// libs
import { useParams } from "react-router-dom";
import { REST } from "../../env/config";
import { useState, useEffect } from "react";

// comps

function Test() {
   const [taskData, setTaskData] = useState({});
   const { id } = useParams();
   useEffect(() => {
      (async () => {
         const tskD = fetch(REST.test(id), {
            headers: {
               Authorization: "Bearer " + localStorage.getItem("token")
            }
         }).then((res) => res.json());
         setTaskData(tskD);
      })();
   }, []);

   return <div>{JSON.stringify(setTaskData)}</div>;
}

export default Test;
