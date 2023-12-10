import { useState } from "react";

const NavbarPage = () => {
  const fecha = new Date();
  const anio = fecha.getFullYear();

  return (
    <footer className="relative mt-10 bg-gray-900 px-4 pt-10">
      <p className="py-5 text-center text-gray-300">
        © {anio} UnderWordLiellaNovels | All Rights Reserved
      </p>
    </footer>
  );
};

export default NavbarPage;
