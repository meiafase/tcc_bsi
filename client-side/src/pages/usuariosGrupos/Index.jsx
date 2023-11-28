import React, { useState, useEffect } from "react";
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

import Axios from "axios";

let id = localStorage.getItem("id");

export default function Index() {
  const [grupoOrUsuario, setGrupoOrUsuario] = useState("usuario");
  const [openCadastrarGrupo, setOpenCadastrarGrupo] = useState(false);
  const [areaId, setAreaId] = useState("");
  const [listaGrupos, setListaGrupos] = useState([]);
  const [idGrupo, setIdGrupo] = useState("");
  const [openEditarGrupo, setOpenEditarGrupo] = useState(false);
  const [ativo, setAtivo] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  useEffect(() => {
    const getUser = async () => {
      await Axios.get(
        `${process.env.REACT_APP_DEFAULT_ROUTE}/api/usuario/${id}`,
        config
      )
        .then((res) => {
          setAreaId(res.data.dados.area_id);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getGrupos = async () => {
      await Axios.get(
        `${process.env.REACT_APP_DEFAULT_ROUTE}/api/grupo/listar/${areaId}`,
        config
      )
        .then((res) => {
          setListaGrupos(res.data.dados);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getGrupos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaId, openEditarGrupo, setOpenEditarGrupo, ativo, setAtivo, openCadastrarGrupo, setOpenCadastrarGrupo]);

  return (
    <>
      <Header drawer={true} />
      <div style={{ marginLeft: "50px", padding: "10px" }}>
        <h2>Configurações {">"} Usuários e Grupos</h2>
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
            <IconButton onClick={() => setOpenCadastrarGrupo(true)} aria-label="Adicionar Grupo">
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
                  onClick={() => {
                    setIdGrupo(grupo.id);
                    setGrupoOrUsuario("grupo");
                  }}
                >
                  <CircleIcon
                    sx={{
                      fontSize: "15px",
                      color: grupo.ativo ? "green" : "red",
                    }}
                  />{" "}
                  {grupo.titulo}
                </li>
              ))}
            </ul>
          </div>
          <Divider />
          <div style={{ margin: "10px" }}>
            <Button
              variant="contained"
              endIcon={<FormatListNumberedIcon />}
              onClick={() => setGrupoOrUsuario("usuario")}
              aria-label="Selecionar todos os usuários"
            >
              Todos os usuários
            </Button>
          </div>
        </div>
        <div style={{ width: "74%", height: "fit-content", padding: "10px" }}>
          {grupoOrUsuario === "usuario" ? (
            <TableGruposUsuarios />
          ) : (
            <CadastrarUsuario
              idGrupo={idGrupo}
              areaId={areaId}
              openEditarGrupo={openEditarGrupo}
              setOpenEditarGrupo={setOpenEditarGrupo}
              ativo={ativo}
              setAtivo={setAtivo}
            />
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
