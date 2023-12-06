import "../css/styles.css";
import { Link } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useEffect, useState } from "react";

const NavbarPaginas = () => {
  const { active, bgNovel, setBackg } = useAdmin();
  return (
    <>
      <Link to="/" className="logo_menu"></Link>
      <header
        className="header_nav"
        style={{ backgroundImage: `url(${bgNovel})` }}
      >
        <nav className="nav_menu">
          <ul className="menu_list">
            <li className="menu_list-item">
              <Link href="" className="list_item-links">
                inicio
              </Link>
            </li>
            <li className="menu_list-item">
              <Link href="" className="list_item-links">
                Novelas en traduccion
              </Link>
            </li>
            <li className="menu_list-item">
              <Link href="" className="list_item-links">
                Ligth Novels
              </Link>
            </li>
            <li className="menu_list-item">
              <Link href="" className="list_item-links">
                Yuujin-chara
              </Link>
            </li>
            <li className="menu_list-item">
              <Link href="" className="list_item-links">
                it Seems
              </Link>
            </li>
            <li className="menu_list-item">
              <Link href="" className="list_item-links">
                Facebook
              </Link>
            </li>
          </ul>
        </nav>
       
      </header>
    </>
  );
};

export default NavbarPaginas;
