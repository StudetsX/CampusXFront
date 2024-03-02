// libs
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// context
import { UserContext } from "../../contexts/UserContext";

// styles
import "./Cabin.scss"

function Cabin() {
   const { id } = useParams();
   const { user } = useContext(UserContext);

   console.log(id, user.id, user.id == id)
   return (
      <div className="cabin">
         <h1>Кабінет</h1>
         <h2>{id}</h2>
         <h2>{user.id}</h2>
         <div className="user-data-wrapper">
            <CabinData id={id} />
            {user.id == id && <ChoiceData />}
         </div>
      </div>
   );
}

function ChoiceData() {
   const [choice, setChoice] = useState("success");
   return (
      <div className="choice-data">
         <ChoiceBar choice={choice} setChoice={setChoice} />
      </div>
   );
}

function ChoiceBar({ choice, setChoice }) {
   const { user } = useContext(UserContext);
   const changeChoice = (ch) => () => {
      setChoice(ch);
   };
   return (
      <div className="choice-bar">
         <ul>
            <li>
               <button onClick={changeChoice("message")} className={choice === "message" ? "active" : ""}>Повідомлення</button>
            </li>
            <li>
               <button onClick={changeChoice("tests")} className={choice === "tests" ? "active" : ""}>Тести</button>
            </li>
            {user.role === "student" && (
               <li>
                  <button onClick={changeChoice("success")} className={choice === "success" ? "active" : ""}>Успішність</button>
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
