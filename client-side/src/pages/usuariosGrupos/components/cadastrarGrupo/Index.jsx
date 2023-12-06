import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Axios from "axios";
import SnackbarError from "../../../components/snackBarError/Index";

export default function CadastrarGrupo(props) {
  const [grupo, setGrupo] = useState("");
  const [openSnackBarError, setOpenSnackBarError] = useState(false)
  const [mensagemSnackBarError, setMensagemSnackBarError] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const handleClose = () => {
    props.setOpenCadastrarGrupo(false);
  };

  const handleSaveInfos = () => {
    Axios.post(
      `${process.env.REACT_APP_DEFAULT_ROUTE}/api/grupo`,
      {
        titulo: grupo,
      },
      config
    )
      .then((res) => {
        if (res.data.status === true) {
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validateInfo = () => {
    if (grupo !== "") {
      handleSaveInfos();
    } else {
      setMensagemSnackBarError("Preencha o campo corretamente!")
      setOpenSnackBarError(true)
    }
  };
  return (
    <>
      <Dialog open={props.openCadastrarGrupo}>
        <DialogTitle>Cadastrar Grupo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Neste campo insira o nome do grupo a ser cadastrado.
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
          <Button onClick={validateInfo} variant="contained" color="success" aria-label="Cadastrar Grupo">
            Cadastrar Grupo
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarError openSnackBarError={openSnackBarError} setOpenSnackBarError={setOpenSnackBarError} mensagemSnackBarError={mensagemSnackBarError} />
    </>
  );
}
