import React, { useEffect, useState } from "react";
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

let listaUsuarios = [];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

export default function DialogListaUsuarios(props) {
  const [integrantes, setIntegrantes] = useState([]);
  useEffect(() => {

    const getUsers = async () => {
      listaUsuarios = []
      setIntegrantes([])
      await Axios.get(
        `${process.env.REACT_APP_DEFAULT_ROUTE}/api/grupo/${props.idGrupo}`,
        config
      )
        .then((res) => {
          res.data.dados.integrantes.map(integra => (
            setIntegrantes(integrantes => [...integrantes, integra.id])
          ))
          integrantes.pop();
        })
        .catch((err) => {
          console.log(err);
        });

      await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/usuario/equipe`, config).then(res => {
        res.data.map(user => (
            user.permissoes? listaUsuarios.push(user) : null
            
        ))
      })
    };
    
    getUsers();
  }, [props.idGrupo]);

  const handleSaveIntegrantes = async () => {
    await Axios.put(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/grupo/${props.idGrupo}`, {
      integrantes
    }, config).then(res => {
      if(res.data.status === true) {
        props.setOpenDialogListarUsuarios(false);
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const handleIntegrantes = (id, status) => {
    
    if(integrantes.length !== 0) {
      if(integrantes.includes(Number(id))) {
          integrantes.splice(integrantes.indexOf(Number(id)), 1);
      } else {
        setIntegrantes(integrantes => [...integrantes, Number(id)])
      }
    } else {
      setIntegrantes(integrantes => [...integrantes, Number(id)])
    }
  }

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
          aria-label="Fechar"
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
          {listaUsuarios? (
            listaUsuarios.map((usuario) => (
              <p
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                <Checkbox
                defaultChecked={integrantes.includes(usuario.id)? true : false}
                  value={usuario.id}
                  onChange={(e) => {
                    handleIntegrantes(e.target.value, e.target.checked);
                  }}
                />
                {usuario.name}
                <Divider />
              </p>
            ))
          ) : (
            <p
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                  textAlign: 'center',
                  color: 'red',
                  padding: '10px'
                }}
              >
                Nenhum integrante disponível
              </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose} aria-label="Cancelar">
            Cancelar
          </Button>
          <Button variant="contained" color="success" onClick={handleSaveIntegrantes} aria-label="Adicionar integrante">
            Adiconar integrante
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
