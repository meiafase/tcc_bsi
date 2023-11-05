import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Axios from 'axios';

export default function DialogEditarResponsavel(props) {

  const [atendente, setAtendente] = useState('');
  const [atendenteList, setAtendenteList] = useState([])


    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

    useEffect(() => {
        const getAtendentes = async () => {
            await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/usuario/equipe`, config).then(res => {
                setAtendenteList(res.data);
            }).catch(err => {})
        }

        getAtendentes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  const handleClose = () => {
    props.setOpenDialogEditarResponsavel(false);
  };


  const handleChange = (event) => {
    setAtendente(event.target.value);
  };

  return (
      <Dialog
        open={props.openDialogEditarResponsavel}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Editar Atendente"}
        </DialogTitle>
        <DialogContent sx={{width: '500px'}}>
          <DialogContentText id="alert-dialog-description">
            Aqui você pode editar o atendente desse chamado.
        <FormControl fullWidth margin='dense'>
        <InputLabel id="demo-simple-select-label">Atendente</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={atendente}
          label="Atendente"
          onChange={handleChange}
        >
            {atendenteList.map(atendente => (
                <MenuItem value={atendente.id}>{atendente.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' variant='contained'>Cancelar</Button>
          <Button onClick={handleClose} autoFocus color='success' variant='contained'>
            Editar
          </Button>
        </DialogActions>
      </Dialog>
  );
}