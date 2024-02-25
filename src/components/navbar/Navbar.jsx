import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import NavbarLogo from "./NavbarLogo";
import "../../styles/Navbar.css";
import NavbarCart from "./NavbarCart";

const Navbar = () => {
  return (
    <header>
      <NavbarLogo />
      <nav>
        <ul className="nav__links">
          <li>
            <NavLink to="/" exact activeClassName="nav__link--active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="nav__link--active">
              Shop
            </NavLink>
          </li>
        </ul>
      </nav>
      <NavLink to="/checkout" className="cart">
        <button className="cart__button">
          <NavbarCart />
        </button>
      </NavLink>
    </header>
  );
};

export default Navbar;
