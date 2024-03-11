import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-danger">
      <Link to={"/"} className="navbar-brand"></Link>
      <div className="navbar-nav">
        <li className="nav-item">
          <Link to={"/customers"} className="nav-link">
            Clientes
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/add"} className="nav-link">
            Formulario
          </Link>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
