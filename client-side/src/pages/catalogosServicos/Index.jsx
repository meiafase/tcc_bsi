import React, { useState, useEffect } from "react";
import Header from "../components/header/Index";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import CircleIcon from "@mui/icons-material/Circle";
import Axios from "axios";
import Assunto from "./components/assunto/Index";
import DialogCadastrarAssunto from "./components/dialogCadastrarAssunto/Index";
import InformacoesCategoria from "./components/informacoesCategoria/Index";

export default function CatalogoServico() {
  const [showAssunto, setShowAssunto] = useState(false);
  const [assuntos, setAssuntos] = useState([]);
  const [idAssunto, setIdAssunto] = useState();
  const [nomeAssunto,  setNomeAssunto] = useState('');
  const [ativo, setAtivo] = useState();
  const [openCadastrarAssunto, setOpenCadastrarAssunto] = useState(false)
  const [idCategoria, setIdCategoria] = useState('');

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  useEffect(() => {
    const getAssuntos = async () => {
      await Axios.get(
        `${process.env.REACT_APP_DEFAULT_ROUTE}/api/assunto/`,
        config
      )
        .then((res) => {
          setAssuntos(res.data.dados);
        })
        .catch((err) => {});
    };

    getAssuntos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ativo, setAtivo, openCadastrarAssunto, setOpenCadastrarAssunto]);
  return (
    <>
      <Header drawer={true} />
      <div style={{ marginLeft: "50px", padding: "10px" }}>
        <h2>Catálogos de Serviços</h2>
      </div>
      <Divider />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "25%", height: "300px" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h3>Assuntos</h3>
            <IconButton>
              <AddIcon sx={{ color: "green", fontSize: "40px" }} onClick={() => setOpenCadastrarAssunto(true)} />
            </IconButton>
          </div>
          <Divider />
          <div style={{ width: "100%", height: "fit-content" }}>
            <ul>
              {assuntos.map((assunto) => (
                <li
                  style={{
                    fontSize: "20px",
                    padding: "10px",
                    listStyle: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => {setShowAssunto('assunto'); setIdAssunto(assunto.id); setNomeAssunto(assunto.titulo); setAtivo(assunto.ativo)}}
                >
                  <CircleIcon
                    sx={{
                      fontSize: "15px",
                      color: assunto.ativo ? "cyan" : "red",
                    }}
                  />{" "}
                  {assunto.titulo}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ width: "74%", height: "300px" }}>
          {showAssunto === 'assunto' ? (
            <Assunto setIdCategoria={setIdCategoria} idAssunto={idAssunto} nomeAssunto={nomeAssunto} ativo={ativo} setAtivo={setAtivo}  setShowAssunto={setShowAssunto} showAssunto={showAssunto}/>
          ) : showAssunto === 'informacaoCategoria' ? (
            <InformacoesCategoria nomeAssunto={nomeAssunto} idCategoria={idCategoria} setShowAssunto={setShowAssunto} />
          ) : (
            <div style={{ padding: "10px" }}>
              <Alert severity="warning">
                <b>Aviso!</b> Selecione algum assunto para prosseguir.
              </Alert>
            </div>
          )}
        </div>
      </div>
      <DialogCadastrarAssunto openCadastrarAssunto={openCadastrarAssunto} setOpenCadastrarAssunto={setOpenCadastrarAssunto} />
    </>
  );
}
