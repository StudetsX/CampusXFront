// libs
import { useParams } from "react-router-dom";
import { REST } from "../../env/config";
import { useState, useEffect } from "react";

// comps

// styles
import "./Test.scss";

function Test() {
   const [taskData, setTaskData] = useState({});
   const { tasks } = taskData;
   console.log(taskData);
   console.log(tasks);
   const { id } = useParams();
   useEffect(() => {
      // testTaskData
      // const testTaskdata = {
      //    name: "азіатскі спількноти",
      //    subject: "азіатскі спількноти 2",
      //    group: "TV-22",
      //    description: "lorem748902738901730981270321",
      //    teacher: "ганна петрівна",
      //    tasks: [
      //       {
      //          question: "dominator222",
      //          answ1: "asas1",
      //          answ2: "asas2",
      //          answ3: "asas3",
      //          answ4: "asas4",
      //          id: "3"
      //       },
      //       {
      //          question: "dominator222",
      //          answ1: "asas1",
      //          answ2: "asas2",
      //          answ3: "asas3",
      //          answ4: "asas4",
      //          id: "1"
      //       }
      //    ]
      // };
      // setTaskData(testTaskdata);

      (async () => {
         const tskD = fetch(REST.test(id), {
            headers: {
               Authorization: "Bearer " + localStorage.getItem("token")
            }
         }).then((res) => res.json());
         setTaskData(tskD);
      })();
   }, []);

   function submit(e) {
      e.preventDefault();
      const selectors = document.querySelectorAll(".answ");
      console.log(selectors);
      const answers = [...selectors].map((sel) => {
         return { key: sel.getAttribute("data-id"), value: sel.value };
      });
      console.log(answers);
      (async () => {
         const res = await fetch(REST.sendTest(id), {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(answers)
         });
         const { status } = res;
         console.log(status);
         if (String(status)[0] === "2") {
            console.log("success")
         } else {
            console.log("fail")
         }
      })();
   }

   return (
      <form className="task" onSubmit={submit}>
         <div className="task-data">
            <h2>{taskData.name}</h2>
            <p>{taskData.subject}</p>
            <p>{taskData.group}</p>
            <p>{taskData.description}</p>
            <p>{taskData.teahcer}</p>
         </div>
         {/* <p>{JSON.stringify(taskData.tasks)}</p> */}
         {tasks && (
            <section>
               <h2>Питання</h2>
               <ul className="micro-test">
                  {tasks.map((tsk, i) => (
                     <DisplayTest key={i} tsk={tsk} />
                  ))}
               </ul>
            </section>
         )}
         <div className="submit-wrapper">
            <button>Підтвердити</button>
         </div>
      </form>
   );
}

function DisplayTest({ tsk }) {
   console.log(tsk);
   // console.log(tsk.question)
   return (
      <li>
         <div className="question">{tsk.question}</div>
         <ul className="answers">
            <li>{tsk.answ1}</li>
            <li>{tsk.answ2}</li>
            <li>{tsk.answ3}</li>
            <li>{tsk.answ4}</li>
         </ul>
         <select className="answ" data-id={tsk.id}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
         </select>
      </li>
   );
}

export default Test;
