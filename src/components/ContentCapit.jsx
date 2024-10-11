import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { dbFirebaseLite } from "../config/firebase";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

const ContentCapit = () => {
  const params = useParams();
  const { idNovel } = params;
  const capitulosGrupo = useRef([]);
  const [expanded, setExpanded] = useState(false);

  const tranformarCapitulos = (capitulos) => {
    const capitulosArray = Object.values(capitulos);
    capitulosArray.sort((a, b) => Number(a.capitulo) - Number(b.capitulo));
    for (let i = 0; i < capitulosArray.length; i += 10) {
      capitulosGrupo.current.push(capitulosArray.slice(i, i + 10));
    }
  };

  const getCapitulos = async () => {
    try {
      const q = query(
        collection(dbFirebaseLite, "Capitulos"),
        where("idNovel", "==", idNovel)
      );
      const documents = await getDocs(q);
      const data = documents.docs.map((doc) => doc.data());
      if (data.length === 0) return [];
      tranformarCapitulos(data);
      return data;
    } catch (error) {
      return [];
    }
  };

  const { isLoading } = useQuery({
    queryKey: ["contentCapit"],
    queryFn: getCapitulos,
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="w-10/12 flex flex-col margin text-white p-4 rounded-lg shadow-md bg-transparent">
        <div className="w-full flex justify-center mb-4">
          <h1 className="text-2xl font-bold text-center">
            Capitulos Disponibles &quot;Novela&quot;
          </h1>
        </div>
        {capitulosGrupo.current.map((grupo, i) => (
          <Accordion
            key={i}
            sx={{
              backgroundColor: "#1A202C",
              margin: "5px",
              borderRadius: expanded === `panel${i}` ? "0 0 10px 10px" : "10px",
              transition: "all 0.3s",
            }}
            expanded={expanded === `panel${i}`}
            onChange={handleChange(`panel${i}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-white" />}
              aria-controls={`panel${i}bh-content`}
              id={`panel${i}bh-header`}
              className="bg-gray-900"
            >
              <Typography sx={{ width: "85%", flexShrink: 0, color: "white" }}>
                {`Capitulos ${i * 10 + 1}-${i * 10 + 10}`}
              </Typography>
            </AccordionSummary>
            {grupo.map((char) => (
              <AccordionDetails
                key={char.id}
                sx={{
                  backgroundColor: "#2D3748",
                  borderRadius: "0 0 10px 10px",
                  margin: "5px auto",
                }}
                className="flex flex-col space-y-2 p-4"
              >
                <Typography className="flex justify-between items-center">
                  <Link
                    to={`/capitulo/${char.idNovel}/${
                      char.capitulo
                    }?novela=${encodeURIComponent(char.titulo)}`}
                    className="text-white hover:text-gray-400"
                  >
                    {char.titulo}
                  </Link>
                </Typography>
              </AccordionDetails>
            ))}
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default ContentCapit;
