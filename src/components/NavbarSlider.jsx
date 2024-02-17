import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import "../css/slider.css";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import TimeSesion from "../utils/TimeSesion";

const NavbarSlider = () => {
  const { active, setActive, activeDark, setDark } = useAdmin();
  const [addClass, setClass] = useState(false);
  const [check, setCheck] = useState(false);
  const { count, userAuth } = useAuth();
  // const [activeDark,setDark]=useState(false)
  const handelActive = () => {
    setClass(!addClass);
    setActive(!active);
  };
  const handelChange = (e) => {
    setDark(!activeDark);
    setCheck(e.target.checked);
    localStorage.setItem("modo_dark", !activeDark);
  };
  useEffect(() => {
    let mode_dark = JSON.parse(localStorage.getItem("modo_dark")) || false;
    setCheck(mode_dark);
  }, []);
  const handeSubmit = (e) => {
    e.preventDefault();
  };
  // console.log(userAuth?.id)
  return (
    <>
      <nav>
        <i className="fas fa-bars btn-menu" onClick={handelActive}></i>
        <a href="#" className="nav-link">
          Secciones
        </a>
        <form onSubmit={handeSubmit}>
          <div className="form-input">
            <input type="search" placeholder="search..." />
            <button className="search-btn">
              <i className="fas fa-search search-icon"></i>
            </button>
          </div>
        </form>
        <span className=" rounded-md bg-slate-300 w-24 flex justify-center items-center">
          {Math.floor(count / 60)}:{count % 60 < 10 ? "0" : ""}
          {count % 60}
        </span>
        <input
          type="checkbox"
          hidden
          checked={check}
          id="switch-mode"
          onChange={handelChange}
        />
        <label htmlFor="switch-mode" className="switch-mode"></label>
        <Link to={`/dashboard/${userAuth?.id}/perfil`} className="profile">
          <i className="fa-regular fa-user"></i>
          Perfil
        </Link>
      </nav>
      <TimeSesion />
    </>
  );
};

export default NavbarSlider;
