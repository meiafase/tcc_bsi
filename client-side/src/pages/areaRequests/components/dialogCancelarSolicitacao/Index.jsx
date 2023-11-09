import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Axios from 'axios';

export default function DialogCancelarSolicitacao(props) {
    
    const [justificativa, setJustificativa] = useState("");

    const handleClose = () => {
    props.setOpenDialogCancelarSolicitacao(false);
    };

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    const handleSaveInfos = async () => {
        await Axios.patch(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/pedido/${props.idSolicitacao}/alterar-status`, {
            justificativa,
            status_id: 5 
        }, config).then(res => {
            if(res.data.status) {
                handleClose()
            }
        }).catch(err => {})
    }

    const handleValidateInput = () => { 
        if(justificativa) {
            handleSaveInfos()
        } else {
            alert('Insira a justificativa')
        }
    }

    return (
        <Dialog open={props.openDialogCancelarSolicitacao} onClose={handleClose}>
            <DialogTitle>Cancelar Solicitação</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{textAlign: 'center', width: '500px', marginBottom: '10px'}}>
                    <p>Tem certeza de que deseja cancelar a solicitação?</p>
                    <b>Obrigatório Informar O Motivo Do Cancelamento.</b>
                </DialogContentText>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Digite a sua justificativa aqui"
                    fullWidth
                    margin='dense'
                    value={justificativa}
                    onChange={e => setJustificativa(e.target.value)}
                    multiline
                    rows={6}
                />
            </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />} onClick={handleClose} aria-label="Enviar">
                    Voltar
                </Button>
                <Button variant="contained" color="error" endIcon={<CloseIcon />} onClick={handleValidateInput} aria-label="Enviar">
                cancelar pedido
                </Button>
            </DialogActions>
        </Dialog>
    );
}