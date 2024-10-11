import { Table, Button } from "rsuite";
import useAdmin from "@/hooks/useAdmin";
import Modal from "@/components/Modal";
import useAuth from "@/hooks/useAuth";
import NavbarSlider from "@/components/NavbarSlider";
import ModalConfirm from "@/components/ModalConfirm";
import useVolumensStore from "@/Store/VolumensStore";
import useInteractionStore from "@/Store/InteractionStore";
import { useEffect, useRef, useState } from "react";

const { Column, HeaderCell, Cell } = Table;

const Content_cards = () => {
  const { activeDark } = useAdmin();
  const { userAuth } = useAuth();
  const { volumens, setItemVolumen, removeVolumen } = useVolumensStore();
  const {
    isDrawerOpen,
    isVisibleModal,
    confirmDialog,
    setIsDrawerOpen,
    setIsVisibleModal,
    setConfirmDialog,
  } = useInteractionStore();

  const [id, setId] = useState(null);
  const isConfirmDialog = useRef(false);

  const handleClick = async (id) => {
    await removeVolumen(id);
  };

  useEffect(() => {
    isConfirmDialog.current = confirmDialog;
    if (isConfirmDialog.current && userAuth.role === "administrador") {
      handleClick(id);
      setConfirmDialog(false);
      setId(null);
    }
  }, [confirmDialog]);

  return (
    <>
      <section
        className={`content bg-zinc-100 text-black ${activeDark ? "dark" : ""}`}
      >
        <NavbarSlider />
        <section className="w-12/12 mx-auto mt-5">
          <Table height={500} data={volumens} onRowClick={(rowData) => {}}>
            {/* <Column width={200} align="center" fixed>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column> */}

            <Column width={270}>
              <HeaderCell>Nombre de la novela</HeaderCell>
              <Cell dataKey="nombreClave" />
            </Column>

            <Column width={80}>
              <HeaderCell>Volumen</HeaderCell>
              <Cell dataKey="volumen" />
            </Column>

            <Column width={180}>
              <HeaderCell>mega</HeaderCell>
              <Cell dataKey="mega" />
            </Column>

            <Column width={180}>
              <HeaderCell>Mediafire</HeaderCell>
              <Cell dataKey="mediafire" />
            </Column>

            <Column width={180}>
              <HeaderCell>MegaEpub</HeaderCell>
              <Cell dataKey="megaEpub" />
            </Column>

            <Column width={180}>
              <HeaderCell>MediafireEpub</HeaderCell>
              <Cell dataKey="mediafireEpub" />
            </Column>

            <Column width={180}>
              <HeaderCell>Acciones</HeaderCell>

              <Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <>
                    <Button
                      className="text-white bg-blue-600 rounded-lg m-1"
                      appearance="link"
                      onClick={() => {
                        setItemVolumen(rowData);
                        setIsVisibleModal(true);
                      }}
                    >
                      Edit
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

      {isVisibleModal && <Modal />}

      {isDrawerOpen && <ModalConfirm />}
    </>
  );
};

export default Content_cards;
