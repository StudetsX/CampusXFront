// libs
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// context
import { UserContext } from "../../contexts/UserContext";

// styles
import "./Cabin.scss";

function Cabin() {
   const [userFullData, setUserFullData] = useState({});

   useEffect(() => {
      // testuser
      // const testUser = {
      //    firstName: "Bohdan",
      //    lastName: "Shovkoplias",
      //    rating: "89",
      //    group: "IPS-22",
      //    role: "STUDENT"
      // };
      // setUserFullData(testUser);

      (async () => {
         const usr = fetch(REST.user(id)).then((res) => res.json());
         setUserFullData(usr);
      })();
   }, []);

   const { id } = useParams();
   const { user } = useContext(UserContext);

   console.log(id, user.id, user.id == id);
   return (
      <div className="cabin">
         <h1>Кабінет</h1>
         {/* <h2>{id}</h2>
         <h2>{user.id}</h2> */}
         <div className="user-data-wrapper">
            <CabinData id={id} userFullData={userFullData} />
            {user.id == id && <ChoiceData userFullData={userFullData} />}
         </div>
         <form className="clear">
            <button
               onClick={() => {
                  localStorage.clear();
               }}
            >
               logout
            </button>
         </form>
      </div>
   );
}

function ChoiceData({ userFullData }) {
   const [choice, setChoice] = useState("message");
   return (
      <div className="choice-data">
         <ChoiceBar choice={choice} setChoice={setChoice} />
         <ChoiceInfo choice={choice} rating={userFullData.rating} />
      </div>
   );
}

function ChoiceInfo({ choice, rating }) {
   return (
      <div className="choice-info">
         {choice === "success" && <h2 className="mark">{rating}</h2>}
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
               <button
                  onClick={changeChoice("message")}
                  className={choice === "message" ? "active" : ""}
               >
                  Повідомлення
               </button>
            </li>
            <li>
               <button
                  onClick={changeChoice("tests")}
                  className={choice === "tests" ? "active" : ""}
               >
                  Тести
               </button>
            </li>
            {user.role === "STUDENT" && (
               <li>
                  <button
                     onClick={changeChoice("success")}
                     className={choice === "success" ? "active" : ""}
                  >
                     Успішність
                  </button>
               </li>
            )}
         </ul>
      </div>
   );
}

function CabinData({ id, userFullData }) {
   return (
      <div className="cabinData">
         <div className="photo-container">
            <img src={userFullData.image} alt="" />
            <p>{userFullData.role}</p>
         </div>
         <ul className="data-list">
            <li>{userFullData.firstName}</li>
            <li>{userFullData.lastName}</li>
            <li>{userFullData.group}</li>
         </ul>
         {/* test */}
      </div>
   );
}

export default Cabin;
