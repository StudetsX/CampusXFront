// libs
import { Outlet, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
// styles
import "./Layout.scss";
// context
import { UserContext } from "../contexts/UserContext";

// comps
import { User } from "../env/svgs";

import ModalReg from "../modals/ModalReg";
import ModalLog from "../modals/ModalLog";

function Layout() {
   return (
      <>
         <Header />
         <Main>
            <Outlet />
         </Main>
         <Footer />
      </>
   );
}

function Header() {
   const { user } = useContext(UserContext);
   // console.log(user);
   return (
      <header className="header">
         <nav>
            <ul>
               <li>
                  <NavLink to="/home">Campus X</NavLink>
               </li>
               <li>
                  <NavLink to="/rating">Рейтинг</NavLink>
               </li>

               {user.role === "STUDENT" && (
                  <>
                     <li>
                        <NavLink to="/tasks">Тести</NavLink>
                     </li>
                     <li>
                        <NavLink to="/messages">Повідомлення</NavLink>
                     </li>
                  </>
               )}
               {user.role === "TEACHER" && (
                  <>
                     <li>
                        <NavLink to="/create-test">Створити тест</NavLink>
                     </li>
                     <li>
                        <NavLink to="/create-message">
                           Написати повідомлення
                        </NavLink>
                     </li>
                  </>
               )}
            </ul>
            <UserData role={user.role} />
         </nav>
      </header>
   );
}

function UserData({ role }) {
   const { user } = useContext(UserContext);
   return (
      <ul className="modalik-data">
         <li className="modalik-name">{user.name ? <NavLink to={`/cabin/${user.id}`}>{user.name}</NavLink> : "Гість"}</li>
         {!role && <Modal />}
      </ul>
   );
}

function Modal() {
   const [open, setOpen] = useState(false);
   const [openModal, setOpenModal] = useState("");
   return (
      <li className="reg-log-button">
         {openModal === "Reg" && <ModalReg setOpenModal={setOpenModal} />}
         {openModal === "Log" && <ModalLog setOpenModal={setOpenModal} />}
         <button
            className="modalik-trigger"
            onClick={() => {
               setOpen((op) => !op);
            }}
         >
            <User />
         </button>
         {open && (
            <div className="modalik">
               <div className="modalik-buttons">
                  <button
                     onClick={() => {
                        setOpenModal("Log");
                     }}
                  >
                     Вхід
                  </button>
                  <button
                     onClick={() => {
                        setOpenModal("Reg");
                     }}
                  >
                     Реєстрація
                  </button>
               </div>
            </div>
         )}
      </li>
   );
}

function Main({ children }) {
   return <main className="main">{children}</main>;
}

function Footer() {
   return <footer className="footer"></footer>;
}

export default Layout;
