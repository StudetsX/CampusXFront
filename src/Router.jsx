// libs
import { BrowserRouter, Route, Routes } from "react-router-dom";
// comps
import Layout from "./pages/Layout";

// Pages
import Home from "./pages/home/Home";
import Cabin from "./pages/cabin/Cabin";
import Rating from "./pages/rating/Rating";
import Tests from "./pages/tests/Tests";
import Test from "./pages/test/Test";

function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route path="/home" element={<Home/>}/>
               <Route path="/rating" element={<Rating/>}/>
               <Route path="/tests" element={<Tests/>}/>
               <Route path="/test/:id" element={<Test/>}/>
               <Route path="/cabin/:id" element={<Cabin/>}/>
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default Router;
