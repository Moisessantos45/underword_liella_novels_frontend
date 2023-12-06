import logo from "../img/Marca.png";

const NavbarChapters = () => {
  return (
    <header className=" relative w-full flex items-center h-32 sm:h-24">
      <img src={logo} alt="" className=" sm:w-2/12 sm:h-20 w-5/12 bg-transparent sm:m-2 m-3" />
    </header>
  );
};

export default NavbarChapters;
