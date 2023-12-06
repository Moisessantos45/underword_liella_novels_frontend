import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Link } from "react-router-dom";

const ContentCapit = ({ capi }) => {
  // console.log(capi);
  const capitulosArray = Object.values(capi);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const gruposDeCapitulos = [];
  for (let i = 0; i < capitulosArray.length; i += 10) {
    gruposDeCapitulos.push(capitulosArray.slice(i, i + 10));
  }

  return (
    <>
      <div className=" w-10/12 flex flex-col" style={{ margin: "20px auto" }}>
        <div className="w-full flex justify-center m-2">
          <h1 className=" text-xl">Capitulos</h1>
        </div>
        {gruposDeCapitulos.map((grupo, i) => (
          <Accordion
            key={i}
            sx={{
              backgroundColor: "#3b3364",
              "&:active": { borderRadius: "0 0 10px 10px" },
              margin: "5px",
            }}
            expanded={expanded === `panel${i}`}
            onChange={handleChange(`panel${i}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0, color: "white" }}>
                {`Capitulos ${i + 1}-${i + 10}`}
              </Typography>
              {/* <Typography sx={{ color: "white" }}>{char.titulo}</Typography> */}
            </AccordionSummary>
            {grupo.map((char) => (
              <AccordionDetails
                key={char.id}
                sx={{
                  backgroundColor: "#2c2449",
                  borderRadius: "0 0 10px 10px",
                  margin: "5px auto",
                }}
              >
                <Typography>
                  <Link
                    to={`/capitulo/${char.clave}/${char.capitulo}`}
                    className="flex items-center text-sm text-white w-10/12 h-5"
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
