import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';
import SnackbarError from '../../../components/snackBarError/Index';

export default function DialogCadastrarAssunto(props) {
    const [assunto, setAssunto] = useState('');
    const [openSnackBarError, setOpenSnackBarError] = useState(false)
    const [mensagemSnackBarError, setMensagemSnackBarError] = useState("");

    const handleClose = () => {
        props.setOpenCadastrarAssunto(false);
    };

  const handleSaveAssunto = async () => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    await Axios.post(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/assunto`, {
        titulo : assunto,
        descricao : "teste"
    }, config).then(res => {
        console.log(res.data)
        if(res.data.status) {
            handleClose();
        }
    }).catch(err => {})
    
  }

  const handleValidateInput = () => {
    if(assunto) {
        handleSaveAssunto()
    } else {
        setMensagemSnackBarError("Preencha o campo corretamente!")
        setOpenSnackBarError(true)
    }
  }

  return (
    <div>
      <Dialog open={props.openCadastrarAssunto} onClose={handleClose}>
        <DialogTitle id="cadastrarAssuntoDialogTitle" aria-label="Cadastrar Assunto">Cadastrar Assunto</DialogTitle>
        <DialogContent>
          <DialogContentText id="cadastrarAssuntoDialogContentText" aria-label="Instruções: Neste campo, insira o nome do assunto a ser cadastrado.">
            Neste campo insira o nome do assunto a ser cadastrado.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome Assunto"
            fullWidth
            onChange={e => setAssunto(e.target.value)}
            aria-label="Campo de entrada para nome do assunto"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' variant='contained' aria-label="Botão para cancelar">Cancelar</Button>
          <Button onClick={handleValidateInput} color='success' variant='contained' aria-label="Botão para cadastrar assunto">Cadastrar</Button>
        </DialogActions>
      </Dialog>
      <SnackbarError openSnackBarError={openSnackBarError} setOpenSnackBarError={setOpenSnackBarError} mensagemSnackBarError={mensagemSnackBarError} />
    </div>
  );
}