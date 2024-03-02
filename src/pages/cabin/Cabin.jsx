// libs
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// context
import { UserContext } from "../../contexts/UserContext";

function Cabin() {
   const { id } = useParams();
   const { user } = useContext(UserContext);
   return (
      <>
         <CabinData id={id} />
         {user.id === id && <ChoiceData />}
      </>
   );
}

function ChoiceData() {
   const [choice, setChoice] = useState("");
   return (
      <div className="choice-data">
         <ChoiceBar setChoice={setChoice} />
      </div>
   );
}

function ChoiceBar({ setChoice }) {
   const { user } = useContext(UserContext);
   const changeChoice = (ch) => () => {
      setChoice(ch)
   };
   return (
      <div className="choice-bar">
         <ul>
            <li>
               <button onClick={changeChoice("message")}>Повідомлення</button>
            </li>
            <li>
               <button onClick={changeChoice("tests")}>Тести</button>
            </li>
            {user.role === "student" && (
               <li>
                  <button onClick={changeChoice("success")}>Успішність</button>
               </li>
            )}
         </ul>
      </div>
   );
}

function CabinData({ id }) {
   const [userFullData, setUserFullData] = useState({});
   //  useEffect(() => {
   //   (async()=>{
   //     const userFullData = fetch(REST(id)).then(res=>res.json());
   //   })()
   //  }, []);
   return (
      <div className="cabinData">
         <div className="photo-container">
            <img src="" alt="" />
            <p>Студент</p>
         </div>
         <ul className="data-list">
            <li>Діман</li>
            <li>Олегов</li>
            <li>ІПС-22</li>
         </ul>
      </div>
   );
}

export default Cabin;
