import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Navbar from "../src/components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Editor from "./pages/editor.pages";
import Multiple from "./pages/404.page";

const App = () => {
  return (
    <div className="flex flex-col w-full min-h-full bg-white text-black ">
      <Router>
        <Routes>
            <Route path='/editor' element={<Editor />} />
            <Route path='/error' element={<Multiple />} />
            <Route path='/' element={<Navbar />}>
               <Route path='/login' element={<Login />} /> {/*A nested route!*/}
               <Route path='/signup' element={<Signup />} /> {/*A nested route!*/}
           </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
