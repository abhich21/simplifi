import { SignUp } from "./components/signup/SignUp";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Welcome from "./components/Welcome";
import { useState } from "react";


function App() {
  const [userName, setUserName] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<SignUp userName={userName} setUserName={setUserName} />}/>
          <Route path="/welcome" exact element={<Welcome userName={userName} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
