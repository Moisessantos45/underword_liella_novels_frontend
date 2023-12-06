import { Link } from "react-router-dom";
import "../css/MenuHeader.css";
import useAdmin from "../hooks/useAdmin";
import { useEffect, useState } from "react";
import bars from "../img/bars.png";
import icon_logo from "../img/Marca.png";
import light from "../img/modo_claro.png";
import dark from "../img/modo-oscuro.png";
import bg_back from "../img/backgraoud.jpg";

const NabvarPrincipal = () => {
  return (
    <>
      <img
        src={icon_logo}
        alt=""
        className="absolute w-32 h-20 cursor-pointer hover:scale-105 btn_logo"
      />
      <header
        className="header m-auto relative top-0 left-0"
        style={{
          backgroundImage: `url(${bg_back})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="header-content">
          <h1 className="flex"> UnderwordLiellaNovels</h1>
        </div>
      </header>
    </>
  );
};

export default NabvarPrincipal;
