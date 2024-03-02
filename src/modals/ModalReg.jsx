// libs
import { useState, useContext } from "react";

// comps
import { Cross } from "../env/svgs";

// context
import { REST } from "../env/config";

import { UserContext } from "../contexts/UserContext";

// styles
import "./ModalReg.scss";
function ModalReg({ setOpenModal }) {
   const { setToken } = useContext(UserContext);

   const [response, setResponse] = useState("");

   const [role, setRole] = useState("student");

   const [image, setImage] = useState(null);

   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [group, setGroup] = useState("");
   const [chair, setChair] = useState("");

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const changeRole = (rl) => (e) => {
      console.log(e);
      e.preventDefault();
      setRole(rl);
   };

   function submit(e) {
      e.preventDefault();
      setResponse("waiting");
      (async () => {
         // formData
         const formData = new FormData();
         formData.append("image", image);
         formData.append("password", password);
         formData.append("lastName", lastName);
         formData.append("firstName", firstName);
         formData.append("email", email);
         formData.append("group", "1");
         formData.append("role", "STUDENT");

         const res = await fetch(REST.reg, { method: "POST", body: formData });
         const { status } = res;
         console.log(status);
         if (String(status)[0] === "2") {
            setResponse("success");
            const token = await res.text();
            setToken(token);
         } else {
            setResponse("fail");
         }
      })();
   }
   return (
      <div className="olerlay">
         <form className="reg" onSubmit={submit}>
            <h2>Реєстрація</h2>
            <button
               className="back"
               onClick={() => {
                  setOpenModal("");
               }}
            >
               <Cross/>
            </button>
            <div className="role-select">
               <button
                  onClick={changeRole("student")}
                  className={role === "student" ? "active" : ""}
               >
                  Студент
               </button>
               <button
                  onClick={changeRole("teacher")}
                  className={role === "teacher" ? "active" : ""}
               >
                  Вчитель
               </button>
            </div>
            <label className="photo">
               <p>insert photo</p>
               <input
                  type="file"
                  onChange={({ target }) => {
                     const fileX = target.files[0];
                     fileX && setImage(fileX);
                  }}
               />
            </label>
            <TextInput
               type="name"
               val={firstName}
               set={setFirstName}
               ph="Імʼя"
            />
            <TextInput
               type="name"
               val={lastName}
               set={setLastName}
               ph="Прізвище"
            />
            {role === "student" && (
               <label className="select-container">
                  <p>Група</p>
                  <select
                     value={group}
                     onChange={({ target }) => {
                        setGroup(target.value);
                     }}
                  >
                     <option value="1">Тв-22</option>
                     <option value="Тв-21">Тв-21</option>
                  </select>
               </label>
            )}
            {role === "teacher" && (
               <label className="select-container">
                  <p>Кафедра</p>
                  <select
                     value={chair}
                     onChange={({ target }) => {
                        setChair(target.value);
                     }}
                  >
                     <option value="Кібернетика">Кібернетика</option>
                     <option value="Бази даних">Бази даних</option>
                  </select>
               </label>
            )}

            <TextInput type="email" val={email} set={setEmail} />
            <TextInput type="password" val={password} set={setPassword} />
            {response || <button className="submit">Підтвердити</button>}
            {/* {response && <p>{response}</p>} */}
         </form>
      </div>
   );
}

function TextInput({ type, val, set, ph }) {
   if (!ph) {
      ph = type;
   }
   return (
      <input
         className="text-field"
         type={type}
         placeholder={ph}
         value={val}
         onChange={({ target }) => set(target.value)}
      />
   );
}

export default ModalReg;
