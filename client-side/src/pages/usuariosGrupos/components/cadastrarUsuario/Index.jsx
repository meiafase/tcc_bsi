import React, { useEffect, useState } from "react";

import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import DialogListaUsuarios from "../dialogListaUsuarios/Index";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import ListItemButton from "@mui/material/ListItemButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PersonIcon from "@mui/icons-material/Person";
import Alert from "@mui/material/Alert";
import Axios from "axios";
import EditarGrupo from "../editarGrupo/Index";

export default function CadastrarUsuario(props) {
  const [openDialogListarUsuarios, setOpenDialogListarUsuarios] =
    useState(false);
  const [nomeGrupo, setNomeGrupo] = useState("");
  const [colaboradores, setColaboradores] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  useEffect(() => {
    const getGrupo = async () => {
      await Axios.get(
        `${process.env.REACT_APP_DEFAULT_ROUTE}/api/grupo/${props.idGrupo}`,
        config
      )
        .then((res) => {
          setNomeGrupo(res.data.dados.titulo);
          props.setAtivo(res.data.dados.ativo);
          setColaboradores(res.data.dados.integrantes);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getGrupo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.idGrupo,
    props.openEditarGrupo,
    props.setOpenEditarGrupo,
    openDialogListarUsuarios,
    setOpenDialogListarUsuarios,
  ]);

  const handleSwitch = async (event) => {
    props.setAtivo(event);
    await Axios.put(
      `${process.env.REACT_APP_DEFAULT_ROUTE}/api/grupo/${props.idGrupo}`,
      {
        ativo: event,
      },
      config
    )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  };
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
            aria-label={`Editar Grupo: ${nomeGrupo}`}
          >
            {nomeGrupo}
          </Button>
        </div>
        <div>
          <FormControlLabel
            control={<Switch />}
            checked={props.ativo}
            onChange={(e) => handleSwitch(e.target.checked)}
            label="Ativar grupo"
            labelPlacement="start"
          />
        </div>
      </div>
      <div>
        <Button
          sx={{ marginBottom: "30px" }}
          variant="contained"
          endIcon={<BorderColorIcon />}
          onClick={() => setOpenDialogListarUsuarios(true)}
          aria-label="Editar Integrantes"
        >
          Editar integrantes
        </Button>
        <h4>Colaborador</h4>
        <Divider />
        {colaboradores.length !== 0 ? (
          colaboradores.map((colab) => (
            <>
              <ListItemButton aria-label={`Colaborador: Desenvolvimento - ${colab.name}`}>
                <PersonIcon sx={{ marginRight: "10px" }} />{" "}
                <p>Desenvolvimento - {colab.name}</p>
              </ListItemButton>
              <Divider />
            </>
          ))
        ) : (
          <Alert severity="warning" aria-label="Aviso: Nenhum integrante adicionado a este grupo.">
            Nenhum integrante adicionado a este grupo.
          </Alert>
        )}
      </div>
      <DialogListaUsuarios
        idGrupo={props.idGrupo}
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
