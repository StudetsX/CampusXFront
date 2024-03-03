// libs
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
// context
import { UserContext } from "../../contexts/UserContext";
import { REST } from "../../env/config";

// styles
import "./Tests.scss";

function Tests() {
   const { user } = useContext(UserContext);
   const [tasks, setTasks] = useState([]);

   useEffect(() => {
      if (user === "Guest") return;
      // console.log(user);
      // console.log(user.groupId);
      (async () => {
         console.log(user.groupId)
         const tsts = await fetch(REST.tests(user.groupId), {
            headers: {
               Authorization: "Bearer " + localStorage.getItem("token")
            }
         }).then((res) => res.json());
         console.log(tsts)
         setTasks(tsts);
      })();
      // test tasks
      console.log(user.groupId);
      // const testTask = [
      //    {
      //       id: "3",
      //       name: "Тести з азійських спільнот",
      //       subject: "азійські спільноти",
      //       group: "TV22",
      //       teacher: "Петров Дмитро"
      //    },
      //    {
      //       id: "2",
      //       name: "Тести з азійських спільнот 2",
      //       subject: "азійські спільноти 2",
      //       group: "TV23",
      //       teacher: "Ганна Дмитріва"
      //    }
      // ];

      // setTasks(testTask);
   }, [user]);
   return (
      <div className="tasks">
         <h1>Завдання</h1>
         <ul>{tasks && tasks.map((t) => <DisplayTask t={t} />)}</ul>
      </div>
   );
}

function DisplayTask({ t }) {
   return (
      <li>
         <NavLink to={`/task${t.id}`}>
            <div className="top">
               <span>{t.name}</span>
               <span>{t.group}</span>
            </div>
            <div className="bottom">
               <span>{t.subject}</span>
               <span>{t.teacher}</span>
            </div>
         </NavLink>
      </li>
   );
}

export default Tests;
