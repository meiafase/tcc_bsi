import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';

export default function DialogHistorico(props) {

    const [historicoList, setHistoricoList] = useState([]);

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

    useEffect(() => {
        const getHistorico = async () => {
            await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/pedido/${props.idSolicitacao}/historico`, config).then(res => {
                setHistoricoList(res.data.dados)
            }).catch(err => {})
        }

        getHistorico()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.idSolicitacao, props.openDialogHistorico])

  const handleClose = () => {
    props.setOpenDialogHistorico(false);
  };

  return (
      <Dialog open={props.openDialogHistorico} >
        <DialogTitle id="alert-dialog-title" aria-label="Histórico de Interações">
          {"Histórico de Interações"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{minWidth: '500px'}}>
            {historicoList.map(historico => (
                <div style={{width: '100%', padding: '5px', backgroundColor: '#87d3f8', marginBottom: '7px', borderRadius: '4px'}}>
                    <div>
                    <b>Data:</b> {historico.data_criacao.split('.')[0].slice(8, 10)+"/"+historico.data_criacao.split('.')[0].slice(5, 7)+"/"+historico.data_criacao.split('.')[0].slice(0, 4)+" "+historico.data_criacao.split('.')[0].slice(11, 19)} <b>Usuário: </b> {historico.usuario.name}
                    </div>
                    <b>Ação:</b> {historico.descricao}
                </div>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' variant='contained'>fechar</Button>
        </DialogActions>
      </Dialog>
  );
}