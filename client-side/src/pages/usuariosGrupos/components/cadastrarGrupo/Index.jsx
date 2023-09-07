import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CadastrarGrupo(props) {
    const handleClose = () => {
        props.setOpenCadastrarGrupo(false);
      };
  return (
    <>
      <Dialog open={props.openCadastrarGrupo}>
        <DialogTitle>Cadastrar Grupo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Neste campo insira o nome do grupo a ser cadastrado.
          </DialogContentText>
          <TextField id="outlined-basic" label="Nome Grupo" fullWidth margin="dense" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">Cancelar</Button>
          <Button onClick={handleClose} variant="contained" color="success">Cadastrar Grupo</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
