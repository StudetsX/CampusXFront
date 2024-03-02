// libs
import { useState, useContext, useEffect } from "react";

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

   const [role, setRole] = useState("STUDENT");

   const [image, setImage] = useState(null);

   const imageSize = image?.size ? image?.size > 1000000 : false;
   // photo visual
   const imageName = image && image.name;
   const imageSrc = image && URL.createObjectURL(image);

   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [group, setGroup] = useState("1");
   const [chair, setChair] = useState("1");

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   // groups chairs
   const [allGroups, setAllGroups] = useState([]);
   const [allChairs, setAllChairs] = useState([]);

   useEffect(() => {
      (async () => {
         const grps = await fetch(REST.findAllGroups).then((res) => res.json());
         setAllGroups(grps);
      })();

      (async () => {
         const chrs = await fetch(REST.findAllChairs).then((res) => res.json());
         setAllChairs(chrs);
      })();
   }, []);

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
         formData.append("group", group);
         formData.append("role", role);

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
               <Cross />
            </button>
            <div className="role-select">
               <button
                  onClick={changeRole("STUDENT")}
                  className={role === "STUDENT" ? "active" : ""}
               >
                  Студент
               </button>
               <button
                  onClick={changeRole("TEACHER")}
                  className={role === "TEACHER" ? "active" : ""}
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

            {/* <label className="photo">
            <div className="photoView">
               {imageSrc && <img src={imageSrc} />}
               <p>{imageName ? imageName : "insert photo (max 1.0 MB)"}</p>
               {imageSize && (
                  <p style={{ color: "#dc4c64" }}>
                     photo is too large (max 1.0 MB)
                  </p>
               )}
            </div>
            <input
               type="file"
               onChange={({ target }) => {
                  const fileX = target.files[0];
                  fileX && setImage(fileX);
               }}
               hidden
            />
         </label> */}
            {role === "STUDENT" && (
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
            )}
            {role === "TEACHER" && (
               <label className="select-container">
                  <p>Кафедра</p>
                  <select
                     value={chair}
                     onChange={({ target }) => {
                        setChair(target.value);
                     }}
                  >
                     {allChairs.map((grp) => (
                        <option value={grp.id}>{grp.name}</option>
                     ))}
                  </select>
               </label>
            )}
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
