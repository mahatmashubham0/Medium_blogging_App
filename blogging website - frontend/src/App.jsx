import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

// Components
import Navbar from "../src/components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Editor from "./pages/editor.pages";
import { lookInSession } from "./common/session";

export const UserContext = createContext({});

const App = () => {

  const [userAuth , setuserAuth] = useState()

  useEffect(()=>{

    let userSession = lookInSession("user")
    console.log(userSession)

    userSession ? setuserAuth(JSON.parse(userSession)) : setuserAuth({token: null})
  },[])

  return (
    <div className="flex flex-col w-full min-h-full bg-white text-black ">
      <UserContext.Provider value={{userAuth , setuserAuth}}>
        <Router>
          <Routes>
            <Route path="/editor" element={<Editor />} />
            {/* <Route path='/error' element={<Multiple />} /> */}
            <Route path="/" element={<Navbar />}>
              <Route path="/login" element={<Login />} /> {/*A nested route!*/}
              <Route path="/signup" element={<Signup />} />{" "}
              {/*A nested route!*/}
            </Route>
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
};

export default App;
