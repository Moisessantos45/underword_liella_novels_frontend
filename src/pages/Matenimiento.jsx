const Matenimiento = () => {
  return (
    <div
      style={{
        background: "#20202C",
        color: "#ffffff",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill={"#ffffff"}
          viewBox="0 0 16 16"
          className="bi bi-tools"
          style={{ marginBottom: "1em" }}
        >
          <path d="M1 0a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1z" />
          <path d="M4.262 1.355a.5.5 0 0 1 .62.394L6.24 8.103a.5.5 0 0 1-.487.579H2.758a.5.5 0 0 1-.487-.58L2.623 3.03a1 1 0 1 1 1.999.325l.057 1.153a.5.5 0 0 1-.986.164L3.528 4.3 2.64 7.997h2.997l1.79-6.35a.5.5 0 0 1 .394-.62zM14.21 1.853a1 1 0 1 1 1.415 1.414l-5.121 5.122-1.508-.503.503-1.508 5.121-5.121zm.708 1.707L11.5 7.978 10.132 6.61l3.417-3.417a.5.5 0 0 0-.708-.708L9.424 5.902l-1.002-1.002 3.896-3.896a1.5 1.5 0 0 1 2.121 0zm-5.068 5.655a.5.5 0 1 1 .707-.707l1 1a.5.5 0 0 1-.707.707l-1-1zM7.293 10.207a.5.5 0 0 1 .707.707L6 12.914v.586a1.5 1.5 0 0 1-.439 1.06l-1.5 1.5a.5.5 0 0 1-.707-.707l1.5-1.5a.5.5 0 0 1 .707-.707v-.586l1.914-1.914zm-4.146.146a.5.5 0 0 1 0-.707l1-1a.5.5 0 0 1 .707.707l-1 1a.5.5 0 0 1-.707 0zm9.852 1.682a1.5 1.5 0 0 0-1.414-.355l-.578-.578a1.5 1.5 0 0 0-2.12 0l-3.896 3.896a1.5 1.5 0 0 0 2.121 2.121l3.896-3.896a1.5 1.5 0 0 0 .355-1.414l.578-.578a1.5 1.5 0 0 0 0-2.12z" />
        </svg>
        <h1 style={{ fontSize: "2.5em", marginBottom: "0.5em" }}>
          Sitio en Mantenimiento
        </h1>
        <p style={{ fontSize: "1.2em", color: "#b0bec8" }}>
          Estamos trabajando para mejorar tu experiencia. Vuelve a visitarnos
          pronto. ¡Gracias por tu paciencia!
        </p>
      </div>
    </div>
  );
};

export default Matenimiento;
