import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Axios from "axios";
export default function EditarGrupo(props) {
  const [grupo, setGrupo] = useState("");
  const [ativo, setAtivo] = useState("");
  const [integrantes, setIntegrantes] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    const getGrupo = async () => {
      await Axios.get(
        `${process.env.REACT_APP_DEFAULT_ROUTE}/api/grupo/${props.idGrupo}`,
        config
      ).then(async (res) => {
        setGrupo(res.data.dados.titulo);
        setAtivo(res.data.dados.ativo);
        await res.data.dados.integrantes.map(inte => (
            setIntegrantes(integrantes => [...integrantes, inte.id])
        ))
      });
    };

    getGrupo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.idGrupo]);



  const handleClose = () => {
    props.setOpenEditarGrupo(false);
  };

  const handleUpdateInfo = async () => {
    await Axios.put(
      `${process.env.REACT_APP_DEFAULT_ROUTE}/api/grupo/${props.idGrupo}`,
      {
        titulo: grupo
      },
      config
    )
      .then((res) => {
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidateInfo = () => {
    if (grupo !== "") {
      handleUpdateInfo();
    } else {
      alert("campo vazio");
    }
  };

  return (
    <Dialog open={props.openEditarGrupo}>
      <DialogTitle>Editar Grupo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Neste campo você pode fazer a alteração que deseja.
        </DialogContentText>
        <TextField
          value={grupo}
          id="outlined-basic"
          label="Nome Grupo"
          fullWidth
          margin="dense"
          variant="outlined"
          onChange={(e) => setGrupo(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error" aria-label="Cancelar">
          Cancelar
        </Button>
        <Button
          onClick={handleValidateInfo}
          variant="contained"
          color="success"
          aria-label="Editar Grupo"
        >
          Editar Grupo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
