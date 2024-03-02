// libs
import { Outlet } from "react-router-dom";
// styles
import "./Layout.scss";
function Layout() {
   return (
      <>
         <Header />
         <Main>
            <div>petro</div>
         </Main>
         <Footer />
      </>
   );
}

function Header() {
   return <header className="header"><p>Yee</p><button className="diman">oleg</button></header>;
}

function Main({ children }) {
   return <main className="main">{children}</main>;
}

function Footer() {
   return <footer className="footer"></footer>;
}

export default Layout;
