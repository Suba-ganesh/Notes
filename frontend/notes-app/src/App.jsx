import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Home from './pages/Home/Home';
import Signup from "./pages/SignUp/Signup";
import Login from "./pages/Login/Login";
import "primeflex/primeflex.css";



const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </Router>
)
function App() {

  return (
    <>
      <div>{routes}</div>
    </>
  )
}

export default App;
