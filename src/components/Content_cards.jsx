import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import Modal from "./Modal";
import useAuth from "../hooks/useAuth";
import NavbarSlider from "./NavbarSlider";
import { Hidden } from "@mui/material";
import ModalConfirm from "./ModalConfirm";

const columns = [
  { id: "name", label: "Nombre", minWidth: 170 },
  { id: "code", label: "Volumen", minWidth: 50 },
  {
    id: "population",
    label: "Ulr Mega",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Url Mediafire",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Epub Mega",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "url",
    label: "Epub Mediafire",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "funciones",
    label: "Funciones",
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
  editarCard,
  handleEdit,
  eliminarDatos,
  userType,
  confirmar_delate,
  setMostrar_modal,
  userAuth
) => {
  const type = "cards";
  rows = data.map((item) => ({
    ...createData(
      item.nombreClave,
      item.volumen,
      item?.mega?.substring(0, 40) + "....",
      item?.mediafire?.substring(0, 40) + "....",
      item?.megaEpub?.substring(0, 40) + "....",
      item?.mediafireEpub?.substring(0, 40) + "....",
      ""
    ),
    funciones: (
      <div className="flex justify-center items-center">
        <button
          onClick={() => {
            editarCard(item), handleEdit(true);
          }}
          className="text-white bg-blue-600 rounded-lg h-7 w-8 m-1"
        >
          <i className="fa-solid fa-pencil text-base text-yellow-500"></i>
          {/* Editar */}
        </button>
        <button
          className={`text-white rounded-lg h-7 w-9 m-1 flex justify-center items-center ${
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

const Content_cards = () => {
  const {
    active,
    cardsVol,
    modal,
    setModal,
    editarCard,
    eliminarDatos,
    activeDark,
    setConfirmar,
    confirmar_delate,
    mostrar_modal,
    setMostrar_modal,
  } = useAdmin();
  const { userType, userAuth } = useAuth();
  const mouse = (valor) => {
    console.log("se paso el mouse", valor);
  };

  const solatar = (valor) => {
    console.log("se dejo el elemnto", valor);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleEdit = (item) => {
    console.log(item);
    setModal(item);
  };
  // console.log(cardsVol);
  const llenarAndSetRows = () => {
    llenar(
      cardsVol,
      editarCard,
      handleEdit,
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
  const type = "cards";
  return (
    <>
      <section
        className={`content bg-zinc-100 text-black ${activeDark ? "dark" : ""}`}
      >
        <NavbarSlider />
        <section className="w-11/12 flex m-auto">
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              backgroundColor: "#2c2449",
              marginTop: 2,
              // maxHeight:500
            }}
          >
            <TableContainer sx={{ maxHeight: 340 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, i) => (
                      <TableCell
                        key={i}
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
                                style={{
                                  color: "#ffffff",
                                }}
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
      {modal && <Modal />}
      {mostrar_modal && <ModalConfirm />}
    </>
  );
};

export default Content_cards;
