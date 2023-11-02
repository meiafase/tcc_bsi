import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';

export default function DialogCadastrarAssunto(props) {
    const [assunto, setAssunto] = useState('');

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
        alert('Preencha o campo!')
    }
  }

  return (
    <div>
      <Dialog open={props.openCadastrarAssunto} onClose={handleClose}>
        <DialogTitle>Cadastrar Assunto</DialogTitle>
        <DialogContent>
          <DialogContentText>
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
          <Button onClick={handleClose} color='error' variant='contained' aria-label="Botão de cancelar">Cancelar</Button>
          <Button onClick={handleValidateInput} color='success' variant='contained' aria-label="Botão de cadastrar assunto">Cadastrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}