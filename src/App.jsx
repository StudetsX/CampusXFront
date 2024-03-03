// comps
import { useEffect, useState } from "react";
import Router from "./Router";

// context
import { UserContext } from "./contexts/UserContext";

function App() {
   const [token, setToken] = useState("");
   const [user, setUser] = useState("Guest");
   useEffect(() => {
      if (!localStorage.getItem("token")) return;
      setToken(localStorage.getItem("token"));
   }, []);

   useEffect(() => {
      console.log("token effect triggered");
      // console.log(token);
      // const userPlaceHodler = {
         
      // }
      // const userPlaceHodler = {
      //    id: 41,
      //    name: "Ivan",
      //    role: "STUDENT",
      //    groupId: "1",
      //    chairId: "1"
      // }
      // setUser(userPlaceHodler);
      if (!token) return;
      console.log("token not empty")
      localStorage.setItem("token", token);
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      setUser(JSON.parse(atob(base64)));  
   }, [token]);

   const provideUser = { user, setToken, token };
   return (
      <UserContext.Provider value={provideUser}>
         <Router />
      </UserContext.Provider>
   );
}

export default App;
