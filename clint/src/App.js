
import './App.css';
import Navbar from "./components/Navbar"
import Product from "./components/Product"
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";
import ForgetPassword from "./components/ForgetPassword";
import NewSubmit from "./components/NewSubmit";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Product />}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forget-pass" element={<ForgetPassword />} />
        <Route path="/otp" element={<NewSubmit />} />
      </Routes>
    </div>
  );
}

export default App;
