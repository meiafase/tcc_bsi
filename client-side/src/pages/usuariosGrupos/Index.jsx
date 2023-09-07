import React, { useState } from "react";
import Header from "../components/header/Index";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CircleIcon from "@mui/icons-material/Circle";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TableGruposUsuarios from "./components/tableGruposUsuarios/Index";
import CadastrarGrupo from "./components/cadastrarGrupo/Index";
import CadastrarUsuario from "./components/cadastrarUsuario/Index";

let listaGrupos = [
  "Grupo 1",
  "Grupo 2",
  "Grupo 3",
  "Grupo 4",
  "Grupo 5",
  "Grupo 6",
];

export default function Index() {
  const [grupoOrUsuario, setGrupoOrUsuario] = useState("usuario");
  const [openCadastrarGrupo, setOpenCadastrarGrupo] = useState(false);

  return (
    <>
      <Header />
      <div style={{ marginLeft: "50px", padding: "10px" }}>
        <h2>Configurações</h2>
      </div>
      <Divider />
      <div
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "25%", height: "fit-content" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h3>Grupos</h3>
            <IconButton onClick={() => setOpenCadastrarGrupo(true)}>
              <AddIcon sx={{ color: "green", fontSize: "40px" }} />
            </IconButton>
          </div>
          <div style={{ width: "100%", height: "fit-content" }}>
            <ul>
              {listaGrupos.map((grupo) => (
                <li
                  style={{
                    fontSize: "20px",
                    padding: "10px",
                    listStyle: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setGrupoOrUsuario('grupo')}
                >
                  <CircleIcon sx={{ fontSize: "15px", color: "cyan" }} />{" "}
                  {grupo}
                </li>
              ))}
            </ul>
          </div>
          <Divider />
          <div style={{ margin: "10px" }}>
            <Button variant="contained" endIcon={<FormatListNumberedIcon />} onClick={() => setGrupoOrUsuario('usuario')}>
              Todos os usuários
            </Button>
          </div>
        </div>
        <div style={{ width: "74%", height: "fit-content", padding: "10px" }}>
          {grupoOrUsuario === 'usuario' ? (
            <CadastrarUsuario />
          ) : (
            <TableGruposUsuarios />
          )}
          
        </div>
      </div>
      <CadastrarGrupo
        openCadastrarGrupo={openCadastrarGrupo}
        setOpenCadastrarGrupo={setOpenCadastrarGrupo}
      />
    </>
  );
}
