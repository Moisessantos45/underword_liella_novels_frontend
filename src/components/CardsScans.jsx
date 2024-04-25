const CardsScans = ({ cards }) => {
  const cardsList = cards.length > 0 ? JSON.parse(cards) : [];
  if (cardsList.length > 0)
    return (
      <section className=" w-11/12 m-auto flex justify-center items-center flex-col md:gap-3 gap-4">
        <div className=" w-full p-2 text-center">
          <h1 className=" text-2xl">
            Para Descargar redirigir hacia las siguientes paginas.
          </h1>
        </div>
        {cardsList.map((card, i) => (
          <figure
            key={i}
            className=" gap-3 p-2 flex flex-col justify-center items-center w-60"
          >
            <a
              href={`${card.linkScan}`}
              className="bg-gradient-to-r from-[#27f743] to-[#711eed] w-40 h-9 rounded-2xl p-2 text-white text-sm text-center font-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              {card.nameScan}
            </a>
            <p className="text-sm text-center font-bold">{card.content}</p>
          </figure>
        ))}
      </section>
    );
};

export default CardsScans;
