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
import { useEffect } from "react";

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
const llenar = (data, handleEdit, eliminarDatos, userType) => {
  const type = "cards";
  rows = data.map((item) => ({
    ...createData(
      item.nombreClave,
      item.volumen,
      item.mega,
      item.mediafire,
      item.megaEpub,
      item.mediafireEpub,
      ""
    ),
    funciones: (
      <div className="flex justify-center items-center">
        <button
          onClick={() => handleEdit(item)}
          className="text-white bg-blue-600 rounded-lg h-7 w-16 m-1"
        >
          Editar
        </button>
        <button
          className={`text-white bg-rose-700 rounded-lg h-7 w-16 m-1 flex justify-center items-center ${
            userType === "administrador" ? "" : "bg-rose-400 cursor-not-allowed"
          }`}
          onClick={() => {
            if (userType === "administrador") {
              eliminarDatos(item.id, type);
            }
          }}
          disabled={userType !== "administrador"}
        >
          Eliminar
        </button>
      </div>
    ),
  }));
};

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263,"funcion","funcion"),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

const Prueba = () => {
  const { active, cardsVol, modal, setModal, editarCard, eliminarDatos } =
    useAdmin();
  const { userType } = useAuth();
  const handelEdit = () => {
    setModal(true);
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
  console.log(cardsVol);
  const handleEdit = (item) => {
    console.log("si funcion edita");
  };

  const llenarAndSetRows = () => {
    llenar(cardsVol, handleEdit, eliminarDatos, userType);
  };

  // useEffect(() => {
  //   llenarAndSetRows();
  // }, [cardsVol]);
  llenarAndSetRows();
  const type = "cards";
  return (
    <>
      <main className={`main_container ${active ? "active_container" : ""}`}>
        <section className=" w-11/12 m-2 flex">
          <Paper sx={{ width: "100%", overflow: "hidden",backgroundColor: "#2c2449"}}>
            <TableContainer sx={{ maxHeight: 340 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
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
      </main>
      {modal && <Modal />}
    </>
  );
};

export default Prueba;
