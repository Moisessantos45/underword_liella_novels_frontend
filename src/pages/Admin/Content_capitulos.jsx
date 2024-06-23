import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useAdmin from "@/hooks/useAdmin";
import { NavLink } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import NavbarSlider from "@/components/NavbarSlider";
import ModalConfirm from "@/components/ModalConfirm";
import { useState } from "react";

const columns = [
  { id: "name", label: "Nombre", minWidth: 170 },
  { id: "code", label: "Titulo", minWidth: 50 },
  {
    id: "population",
    label: "Capitulo",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Contenido",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "funciones",
    label: "Opcions",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size, url, funciones) {
  const density = population / size;
  return { name, code, population, size, density, url, funciones };
}

let rows = [];
const llenar = (
  data,
  obtenerDatos,
  eliminarDatos,
  userType,
  confirmar_delate,
  setMostrar_modal,
  userAuth
) => {
  const type = "capitulos";
  rows = data.map((item) => ({
    ...createData(
      item.nombre,
      item.titulo,
      item.capitulo,
      item.contenido?.substring(0, 40) + "....",
      ""
    ),
    funciones: (
      <div className="flex justify-center items-center">
        <NavLink
          className="bg-blue-600 rounded-lg h-7 w-8 m-1 flex justify-center items-center"
          to={`/dashboard/${userAuth.id}/agregar-capitulo`}
          onClick={() => {
            obtenerDatos(item);
          }}
        >
          <i className="fa-solid fa-pencil text-base text-yellow-500"></i>
          {/* Editar */}
        </NavLink>
        <button
          className={`text-white  rounded-lg h-7 w-9 m-1 flex justify-center items-center ${
            userType === "administrador" ? "" : "bg-rose-400 cursor-not-allowed"
          }`}
          onClick={() => {
            if (userAuth.tipo === "administrador") {
              setMostrar_modal(true);
              if (confirmar_delate) {
                eliminarDatos(item.id, type);
              }
            }
          }}
          disabled={userType !== "administrador"}
        >
          <i className="fa-solid text-base fa-trash-can p-1 rounded-l bg-rose-700"></i>
          {/* Eliminar */}
        </button>
      </div>
    ),
  }));
};

const Content_capitulos = () => {
  const {
    active,
    obtenerDatos,
    eliminarDatos,
    capitulosInfo,
    activeDark,
    setConfirmar,
    confirmar_delate,
    mostrar_modal,
    setMostrar_modal,
  } = useAdmin();
  const { userType, userAuth } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const llenarAndSetRows = () => {
    llenar(
      capitulosInfo,
      obtenerDatos,
      eliminarDatos,
      userType,
      confirmar_delate,
      setMostrar_modal,
      userAuth
    );
  };

  // useEffect(() => {
  //   llenarAndSetRows();
  // }, [cardsVol]);
  llenarAndSetRows();
  const type = "capitulos";
  return (
    <>
      <section
        className={`content bg-zinc-100 text-black ${activeDark ? "dark" : ""}`}
      >
        <NavbarSlider />
        <section className="w-11/12 m-auto flex">
          <Paper
            sx={{
              width: "100%",
              // height: "80vh",
              overflow: "hidden",
              backgroundColor: "#2c2449",
              marginTop: 2,
              // maxHeight:500
            }}
          >
            <TableContainer
              sx={{ maxHeight: 490, minHeight: 400, transition: "all" }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          background: "#352e5a",
                          color: "#ffffff",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ color: "#ffffff" }}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              style={{ color: "#ffffff" }}
              sx={{ marginTop: "10px" }}
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </section>
      </section>
      {mostrar_modal && <ModalConfirm />}
    </>
  );
};

export default Content_capitulos;
