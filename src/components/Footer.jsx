import { useEffect, useState } from "react";

const Footer = () => {
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    const anio = new Date().getFullYear();
    setFecha(anio);
  }, []);
  return (
    <>
      <section className="footer">
        <p>Derechos Reservados</p>
        <p>Copyright © 2023 UnderwordLiellaNovels</p>
      </section>
    </>
  );
};

export default Footer;
