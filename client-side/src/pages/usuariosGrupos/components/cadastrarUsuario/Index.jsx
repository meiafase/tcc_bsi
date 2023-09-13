import React, { useEffect, useState } from "react";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DialogListaUsuarios from "../dialogListaUsuarios/Index";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import ListItemButton from "@mui/material/ListItemButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PersonIcon from "@mui/icons-material/Person";
import Alert from '@mui/material/Alert';
import Axios from "axios";
import EditarGrupo from "../editarGrupo/Index";

export default function CadastrarUsuario(props) {
  const [openDialogListarUsuarios, setOpenDialogListarUsuarios] =
    useState(false);
  const [isGrupoVazio, setIsGrupoVazio] = useState(false);
  const [nomeGrupo, setNomeGrupo] = useState("");
  const [colaboradores, setColaboradores] = useState([]);
  const [ativo, setAtivo] = useState("");

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const getGrupo = async () => {
      await Axios.get(
        `${process.env.REACT_APP_DEFAULT_ROUTE}/api/grupo/${props.idGrupo}`,
        config
      )
        .then((res) => {
          setNomeGrupo(res.data.dados.titulo);
          setAtivo(res.data.dados.ativo);
          setColaboradores(res.data.dados.integrantes);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getGrupo();
  }, [props.idGrupo, props.openEditarGrupo, props.setOpenEditarGrupo]);
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            sx={{ marginBottom: "30px" }}
            size="small"
            variant="contained"
            endIcon={<BorderColorIcon />}
            onClick={() => props.setOpenEditarGrupo(true)}
          >
            {nomeGrupo}
          </Button>
        </div>
        <div>
          <FormControlLabel
            control={<Switch />}
            checked={ativo}
            onChange={() => {ativo === 1? setAtivo(0) : setAtivo(1)}}
            label="Ativar grupo"
            labelPlacement="start"
          />
        </div>
      </div>
      {isGrupoVazio ? (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            marginBottom: "100px",
          }}
        >
          <div style={{ height: "500px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PersonAddAlt1Icon sx={{ fontSize: "200px", color: "#83d9f0" }} />
            </div>
            <Divider />
            <div style={{ textAlign: "center" }}>
              <h2>Nenhum integrante cadastrado</h2>
              <h4>Clique em "Adicionar Integrante" para adicionar ao grupo</h4>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                
              >
                Adicionar Integrante
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Button
            sx={{ marginBottom: "30px" }}
            variant="contained"
            endIcon={<BorderColorIcon />}
            onClick={() => setOpenDialogListarUsuarios(true)}
          >
            Editar integrantes
          </Button>
          <h4>Colaborador</h4>
          <Divider />
          {colaboradores.length !== 0? (
            colaboradores.map((colab) => (
              <>
                <ListItemButton onClick={() => alert(colab.id)}>
                  <PersonIcon sx={{ marginRight: "10px" }} />{" "}
                  <p>Desenvolvimento - {colab.name}</p>
                </ListItemButton>
                <Divider />
              </>
            ))
          ) : (
            <Alert severity="warning">Nenhum integrante adicionado a este grupo.</Alert>
          )}
        </div>
      )}
      <DialogListaUsuarios
        openDialogListarUsuarios={openDialogListarUsuarios}
        setOpenDialogListarUsuarios={setOpenDialogListarUsuarios}
      />
      <EditarGrupo
        idGrupo={props.idGrupo}
        openEditarGrupo={props.openEditarGrupo}
        setOpenEditarGrupo={props.setOpenEditarGrupo}
      />
    </>
  );
}
