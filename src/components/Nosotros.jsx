import bg from "../img/Otonari_1.jpg";

const Nosotros = () => {
  return (
    <section className=" w-11/12 flex-col flex-wrap justify-center gap-2 flex text-center margin">
      <h1 className=" sm:text-xl">TRADUCCIONES DE NOVELAS LIGERAS, MANGAS Y NOVELAS WEB.</h1>
      <p>Light novels, Mangas and Web Novels translations by fans for fans.</p>
      <img className=" sm:w-7/12 w-11/12 self-center m-2 sm:h-80 h-64" src={bg} alt="" />
      <h1 className=" text-xl">NOSOTROS, UNDERWORD LIELLA NOVELS</h1>
      <pre className=" whitespace-pre-line font-bold text-sm w-9/12 margin lineHeigth">
        {" "}
        Somos un grupo de traductores fanáticos de las novelas ligeras, mangas y
        anime. ¿Por qué nos decidimos en crear este grupo? Pues anteriormente
        éramos conocidos bajo otro nombre llamado Shinomiya Translations, pero
        debido a muchos problemas internos nos vimos obligados a disolver dicho
        grupo, hasta que el actual fundador #Rouni formó este nuevo proyecto
        para traducir las obras que más nos guste dijimos. ¿Y por qué no
        intentarlo? Desde ese entonces hemos trabajado en distintos proyectos
        tanto mangas, como novelas hasta hoy en día que continuamos con nuestro
        arduo trabajo. Y así nos mantendremos durante un tiempo.
      </pre>
    </section>
  );
};

export default Nosotros;
