import { Table, Button } from "rsuite";
import useAdmin from "@/hooks/useAdmin";
import { NavLink } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import NavbarSlider from "@/components/NavbarSlider";
import ModalConfirm from "@/components/ModalConfirm";
import useChaptersStore from "@/Store/ChaptersStore";
import useInteractionStore from "@/Store/InteractionStore";
import { useEffect, useRef, useState } from "react";

const { Column, HeaderCell, Cell } = Table;

const Content_capitulos = () => {
  const { chapters, setItemChapter, removeChapter } = useChaptersStore();
  const { isDrawerOpen, confirmDialog, setIsDrawerOpen, setConfirmDialog } =
    useInteractionStore();
  const { activeDark } = useAdmin();
  const { userAuth } = useAuth();

  const [id, setId] = useState(null);
  const isConfirmDialog = useRef(false);

  const handleDelete = async () => {
    await removeChapter(id);
    setId(null);
  };

  useEffect(() => {
    isConfirmDialog.current = confirmDialog;
    if (isConfirmDialog.current && userAuth.role === "administrador") {
      handleDelete();
      setConfirmDialog(false);
    }
  }, [confirmDialog]);

  return (
    <>
      <section
        className={`content bg-zinc-100 text-black ${activeDark ? "dark" : ""}`}
      >
        <NavbarSlider />
        <section className="w-12/12 mx-auto mt-5">
          <Table height={500} data={chapters} onRowClick={(_) => {}}>
            {/* <Column width={200} align="center" fixed>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column> */}

            <Column width={350}>
              <HeaderCell>Nombre del capitulo</HeaderCell>
              <Cell dataKey="nombre" />
            </Column>

            <Column width={450}>
              <HeaderCell>Titulo del capitulo</HeaderCell>
              <Cell dataKey="titulo" />
            </Column>

            <Column width={80}>
              <HeaderCell>Capitulo</HeaderCell>
              <Cell dataKey="capitulo" />
            </Column>

            <Column width={190}>
              <HeaderCell>Fecha</HeaderCell>
              <Cell dataKey="createdAt" />
            </Column>

            <Column width={200}>
              <HeaderCell>Acciones</HeaderCell>

              <Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <>
                    <Button
                      className="text-white bg-blue-600 rounded-lg m-1"
                      appearance="link"
                      onClick={() => setItemChapter(rowData)}
                      // disabled={rowData.contenido.includes("firebasestorage")}
                    >
                      <NavLink
                        to={`/dashboard/${userAuth.id}/agregar-capitulo?id=${rowData.id}`}
                      >
                        Edit
                      </NavLink>
                    </Button>
                    <Button
                      appearance="link"
                      className={`text-white rounded-lg m-1 flex justify-center items-center ${
                        userAuth.role === "administrador"
                          ? ""
                          : "bg-rose-400 cursor-not-allowed"
                      }`}
                      onClick={() => {
                        setIsDrawerOpen(true);
                        setId(rowData.id);
                      }}
                      disabled={userAuth.role !== "administrador"}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Cell>
            </Column>
          </Table>
        </section>
      </section>
      {isDrawerOpen && <ModalConfirm />}
    </>
  );
};

export default Content_capitulos;
