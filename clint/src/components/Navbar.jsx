import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
const Navbar = () => {
  // const navigate = useNavigate();
  return (
    <div className="navbar">
      <div>
        <Link  className="link" to="/"> Product Page</Link>
      </div>
      <div>
        <Link className="link" to="/home">Home Page</Link>
      </div>
      <div>
        <Link className="link" to="/signup">Authentication</Link>
      </div>
    </div>
  );
};

export default Navbar;
