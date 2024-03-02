// libs
import { BrowserRouter, Route, Routes } from "react-router-dom";
// comps
import Layout from "./pages/Layout";

function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />} />
         </Routes>
      </BrowserRouter>
   );
}

export default Router;
