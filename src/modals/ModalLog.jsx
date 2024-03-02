// libs
import { useContext, useState } from "react";

//comps
import { Cross } from "../env/svgs";

// context
import { UserContext } from "../contexts/UserContext";
import { REST } from "../env/config";

// style
import "./ModalLog.scss";

function ModalLog({ setOpenModal }) {
   const { setToken } = useContext(UserContext);

   const [response, setResponse] = useState("");

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   function submit(e) {
      e.preventDefault();
      setResponse("waiting");

      (async () => {
         const res = await fetch(REST.log, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password })
         });
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
         <form className="log" onSubmit={submit}>
            <h2>Авторизація</h2>
            <button
               className="back"
               onClick={() => {
                  setOpenModal("");
               }}
            >
               <Cross />
            </button>
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

export default ModalLog;
