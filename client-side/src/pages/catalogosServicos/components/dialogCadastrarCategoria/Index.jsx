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

export default function DialogCadastrarCategoria(props) {
    const [categoria, setCategoria] = useState('');
    const [subcategorias, setSubcategorias] = useState(false);

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
        alert('Preencha o campo!')
    }
  }

  return (
    <div>
      <Dialog open={props.openCadastrarCategoria} onClose={handleClose}>
        <DialogTitle>Cadastrar Categoria</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Neste campo insira o nome da categoria a ser cadastrada
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome Categoria"
            fullWidth
            onChange={e => setCategoria(e.target.value)}
          />
          <FormControlLabel control={<Checkbox checked={subcategorias} onChange={e => setSubcategorias(e.target.checked)} />} label="Ativar subcategorias?" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' variant='contained'>Cancelar</Button>
          <Button onClick={handleValidateInput} color='success' variant='contained'>Cadastrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}