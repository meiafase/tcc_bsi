import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';

export default function DialogCadastrarSubcategorias(props) {
    const [subcategorias, setSubcategorias] = useState("");

    const handleClose = () => {
        props.setOpenCadastrarSubcategoria(false);
    };

  const handleSaveCategoria = async () => {
    console.log('asdas')
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    await Axios.post(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/sub_categoria`, {
        categoria_id: props.idCategoria,
        titulo: subcategorias
    }, config).then(res => {
        if(res.data.status) {
            setSubcategorias("");
            handleClose()
        }
    }).catch(err => {})
  }

  const handleValidateInput = () => {
    if(subcategorias) {
        handleSaveCategoria()
    } else {
        alert('Preencha o campo!')
    }
  }

  return (
    <div>
      <Dialog open={props.openCadastrarSubcategoria} onClose={handleClose}>
        <DialogTitle id="cadastrarCategoriaDialogTitle" aria-label="Cadastrar Categoria">Cadastrar Subcategoria</DialogTitle>
        <DialogContent>
          <DialogContentText id="cadastrarCategoriaDialogContentText" aria-label="Instruções: Neste campo, insira o nome da categoria a ser cadastrada.">
            Neste campo insira o nome da subcategoria a ser cadastrada
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={subcategorias}
            label="Nome Subcategoria"
            fullWidth
            onChange={e => setSubcategorias(e.target.value)}
            aria-label="Campo de entrada para nome da subcategoria"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' variant='contained' aria-label="Botão para cancelar">Cancelar</Button>
          <Button onClick={handleValidateInput} color='success' variant='contained' aria-label="Botão para cadastrar subcategoria">Cadastrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}