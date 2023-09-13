import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import { Divider } from "@mui/material";
import Axios from "axios";

let listaUsuarios = [
  { value: 1, nome: "Pessoa 1" },
  { value: 2, nome: "Pessoa 2" },
  { value: 3, nome: "Pessoa 3" },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DialogListaUsuarios(props) {
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const getUsers = async () => {
      //await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}`, config);
    };

    getUsers();
  });

  const handleClose = () => {
    props.setOpenDialogListarUsuarios(false);
  };
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.openDialogListarUsuarios}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Integrantes
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ width: "500px" }}>
          {listaUsuarios.map((usuario) => (
            <p
              style={{
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              <Checkbox
                value={usuario.value}
                onChange={(e) => {
                  console.log(e.target.value, e.target.checked);
                }}
              />
              {usuario.nome}
              <Divider />
            </p>
          ))}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="success">
            Adiconar integrante
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
