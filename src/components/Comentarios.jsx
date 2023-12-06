import { useEffect } from "react";
import { Link } from "react-router-dom";

const Comentarios = () => {
  useEffect(() => {
    // Este código se ejecutará una vez que el componente se monte
    const d = document;
    const s = d.createElement("script");
    s.src = 'https://underwordliellanovelsm.disqus.com/embed.js';
    s.setAttribute("data-timestamp", +new Date());
    (d.head || d.body).appendChild(s);
  }, []);
  return (
    <div>
      {/* Agrega un contenedor con el id "disqus_thread" donde se cargarán los comentarios */}
      <div id="disqus_thread" className="margin"></div>

      {/* Mensaje para los usuarios que tengan JavaScript desactivado */}
      <noscript>
        Please enable JavaScript to view the{" "}
        <Link to="https://disqus.com/?ref_noscript">
          comments powered by Disqus.
        </Link>
      </noscript>
    </div>
  );
};

export default Comentarios;
