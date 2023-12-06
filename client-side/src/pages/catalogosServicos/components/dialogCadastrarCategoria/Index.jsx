import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Axios from 'axios';
import SnackbarError from '../../../components/snackBarError/Index';

export default function DialogCadastrarCategoria(props) {
    const [categoria, setCategoria] = useState('');
    const [subcategorias, setSubcategorias] = useState(false);
    const [openSnackBarError, setOpenSnackBarError] = useState(false)
    const [mensagemSnackBarError, setMensagemSnackBarError] = useState("")

    const handleClose = () => {
        props.setOpenCadastrarCategoria(false);
    };

  const handleSaveCategoria = async () => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    await Axios.post(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/categoria`, {
        assunto_id: props.idAssunto,
        possui_subcategorias: subcategorias,
        titulo : categoria,
        descricao : ''
    }, config).then(res => {
        if(res.data.status) {
            handleClose()
        }
    }).catch(err => {})
  }

  const handleValidateInput = () => {
    if(categoria) {
        handleSaveCategoria()
    } else {
        setMensagemSnackBarError('Preencha o campo corretamente!')
        setOpenSnackBarError(true)
    }
  }

  return (
    <div>
      <Dialog open={props.openCadastrarCategoria} onClose={handleClose}>
        <DialogTitle id="cadastrarCategoriaDialogTitle" aria-label="Cadastrar Categoria">Cadastrar Categoria</DialogTitle>
        <DialogContent>
          <DialogContentText id="cadastrarCategoriaDialogContentText" aria-label="Instruções: Neste campo, insira o nome da categoria a ser cadastrada.">
            Neste campo insira o nome da categoria a ser cadastrada
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome Categoria"
            fullWidth
            onChange={e => setCategoria(e.target.value)}
            aria-label="Campo de entrada para nome da categoria"
          />
          <FormControlLabel control={<Checkbox checked={subcategorias} onChange={e => setSubcategorias(e.target.checked)} aria-label="Ativar subcategorias" />} label="Ativar subcategorias?" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' variant='contained' aria-label="Botão para cancelar">Cancelar</Button>
          <Button onClick={handleValidateInput} color='success' variant='contained' aria-label="Botão para cadastrar categoria">Cadastrar</Button>
        </DialogActions>
      </Dialog>
      <SnackbarError openSnackBarError={openSnackBarError} setOpenSnackBarError={setOpenSnackBarError} mensagemSnackBarError={mensagemSnackBarError} />
    </div>
  );
}