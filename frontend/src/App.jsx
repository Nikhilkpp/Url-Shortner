import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from './Home';
import Redirect from "./components/Redirect";
export default function App(){
  return(
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} /> 
          <Route path="/:id" element={<Redirect/>} />
        </Routes>
      </Router>

  )

}


