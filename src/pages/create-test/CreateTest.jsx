// libs
import { useState, useEffect, useContext } from "react";

// context
import { UserContext } from "../../contexts/UserContext";
import { REST } from "../../env/config";
// comps
import { Plus } from "../../env/svgs";

// styles
import "./CreateTest.scss";
function CreateTest() {
   const { token } = useContext(UserContext);

   const [title, setTitle] = useState("");

   const [allGroups, setAllGroups] = useState([]);
   const [allSubjects, setAllSubjects] = useState([]);

   const [group, setGroup] = useState("1");
   const [subject, setSubject] = useState("1");

   const [description, setDescription] = useState("");

   // testquestions
   // const testQuestions = [
   //    {
   //       id: 1,
   //       question: "hello my nigga"
   //    }
   // ];
   const [questions, setQuestions] = useState([]);

   useEffect(() => {
      (async () => {
         const grps = await fetch(REST.findAllGroups).then((res) => res.json());
         setAllGroups(grps);
      })();

      (async () => {
         const sbjcts = await fetch(REST.findAllSubjects).then((res) =>
            res.json()
         );
         setAllSubjects(sbjcts);
      })();
   }, []);

   function submit(e) {
      e.preventDefault();
      const tests = document.querySelectorAll(".questions .test");
      console.log(tests);
      const sendTests = [...tests].map((tst) => {
         console.log(tst);
         const question = tst.querySelector(".test-quesion").value;
         console.log(question);
         const answer1 = tst.querySelector(".ans1").value;
         console.log(answer1);
         const answer2 = tst.querySelector(".ans2").value;
         const answer3 = tst.querySelector(".ans3").value;
         const answer4 = tst.querySelector(".ans4").value;
         const trueNumber = tst.querySelector(".true-number").value;
         return {
            question,
            answ1: answer1,
            answ2: answer2,
            answ3: answer3,
            answ4: answer4,
            trueNumber
         };
      });
      const sendData = {
         name: title,
         group,
         subject,
         description,
         tasks: sendTests
      };
      console.log(sendData);

      (async () => {
         const res = await fetch(REST.createTest, {
            method: "POST",
            headers: {
               "Content-type": "application/json",
               "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(sendData)
         });
         const { status } = res;
         console.log(status);
         if (String(status)[0] === "2") {
            console.log("ok");
         } else {
            console.log("fail");
         }
      })();
   }
   return (
      <div className="create-test">
         <h1>Створити тест</h1>
         <div className="fields">
            <input
               className="text-field"
               type="text"
               value={title}
               onChange={({ target }) => {
                  setTitle(target.value);
               }}
               placeholder="Назва тесту"
            />
            <div className="selects-wrapper">
               <label className="select-container">
                  <p>Предмет</p>
                  <select
                     value={subject}
                     onChange={({ target }) => {
                        setSubject(target.value);
                     }}
                  >
                     {allSubjects.map((grp) => (
                        <option value={grp.id}>{grp.name}</option>
                     ))}
                  </select>
               </label>

               <label className="select-container">
                  <p>Група</p>
                  <select
                     value={group}
                     onChange={({ target }) => {
                        setGroup(target.value);
                     }}
                  >
                     {allGroups.map((grp) => (
                        <option value={grp.id}>{grp.name}</option>
                     ))}
                  </select>
               </label>
            </div>
            <textarea
               className="text-field"
               placeholder="Опис тесту"
               cols="30"
               rows="10"
               onChange={({target})=>{setDescription(target.value)}}
            ></textarea>
         </div>
         <ul className="questions">
            {questions &&
               questions.map((q) => (
                  <Question
                     key={q.id}
                     id={q.id}
                     questions={questions}
                     setQuestions={setQuestions}
                  />
               ))}
            <li className="add-question">
               <button
                  onClick={() => {
                     setQuestions((qs) => [
                        ...qs,
                        {
                           id: qs.length + 1,
                           question: "",
                           answer1: "",
                           answer2: "",
                           answer3: "",
                           answer4: ""
                        }
                     ]);
                  }}
               >
                  <span>Додати питання</span>
                  <Plus />
               </button>
            </li>
         </ul>
         <div className="create-test-sibmit-wrapper">
            <button onClick={submit}>Підтвердити</button>
         </div>
      </div>
   );
}

function Question({ id, questions, setQuestions }) {
   return (
      <li key={id} className="test">
         <input type="text" className="test-quesion" placeholder="Питання" />
         <ul className="test-answers">
            <li>
               <input type="text" className="ans1" />
            </li>
            <li>
               <input type="text" className="ans2" />
            </li>
            <li>
               <input type="text" className="ans3" />
            </li>
            <li>
               <input type="text" className="ans4" />
            </li>
            <select className="true-number">
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
            </select>
         </ul>
      </li>
   );
}

export default CreateTest;
