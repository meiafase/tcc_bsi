import React, { useEffect } from "react";
import Axios from 'axios';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EastIcon from '@mui/icons-material/East';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Header from "../../../components/header/Index";

export default function MyServiceInfo (props) {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

    useEffect(() => {
        const getSolicitacao = async () => {
            await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/pedido/${props.idSolicitacao}`, config).then(res => {
                console.log(res.data)
            }).catch(err => {})
        }

        getSolicitacao()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.idSolicitacao])

    return(
        <>
            <Header drawer={true} />
            <div style={{ width: "100%", height: "fit-content", display: 'flex', justifyContent: 'center'}}>
                <div style={{width: '98%', height: 'fit-content'}}>
                    <div style={{ marginLeft: "50px", padding: "10px", display: 'flex' }}>
                        <h2 style={{marginRight: '20px'}}>Meus Atendimentos {">"} Solicitação {props.idSolicitacao}</h2>
                        <p style={{marginRight: '20px'}}><Chip label="Em Atendimento" color="warning" aria-label="Status: Em Atendimento"/></p>
                        <Button variant="text" startIcon={<AccessTimeIcon />} aria-label="Ver histórico da solicitação">
                            histórico da solicitação
                        </Button>
                    </div>
                    <Divider />
                </div>
            </div>
            <div style={{width: '100%', height: '80vh', marginTop: '30px', display: 'flex', justifyContent: 'space-between'}}>
                <div style={{width: '25%', height: '80vh', overflow: 'auto', paddingBottom: "100px"}}>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <Button sx={{width: '80%'}} variant="contained" endIcon={<EastIcon />} aria-label="Iniciar Atendimento">iniciar atendimento </Button>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <div style={{width: '80%'}}>
                            <h3>Origem</h3>
                            <p>**DESENVOLVIMENTO</p>
                        </div>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <div style={{width: '80%', height: 'fit-content', border: "1px solid black", borderRadius: '6px'}}>
                            <div style={{padding: '10px'}}>
                                <p style={{fontWeight: 'bold', fontSize: '20px'}}>Solicitante <LinkIcon aria-label="Link para informações adicionais" /></p>
                                <p>**Ana Maria Vargas</p>
                                <p>**aninha_vargas@hotmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                        <div style={{width: '80%', height: 'fit-content', backgroundColor: '#87d3f8', borderRadius: '6px'}}>
                            <div style={{padding: '10px'}}>
                                <p style={{fontWeight: 'bold', fontSize: '20px'}}>Atendente</p>
                                <p>**Ana Maria Vargas</p>
                                <p>**aninha_vargas@hotmail.com</p>
                                <Button variant="contained" endIcon={<EditIcon />} aria-label="Editar Atendente">editar Atendente </Button>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                        <div style={{width: '80%', height: 'fit-content'}}>
                        <Divider />
                            <div style={{padding: '10px'}}>
                                <p style={{fontWeight: 'bold', fontSize: '22px'}}>Assunto</p>
                                <p aria-label="Assunto">**PRINCIPAL</p>
                                <p style={{fontWeight: 'bold', fontSize: '22px'}}>Categoria</p>
                                <p aria-label="Categoria">**CATEGORIA</p>
                                <p style={{fontWeight: 'bold', fontSize: '22px'}}>Sub-Categoria</p>
                                <p aria-label="Sub-Categoria">**SUBCATEGORIA</p>
                            </div>
                        <Divider />
                        </div>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                        <div style={{width: '80%', height: 'fit-content'}}>
                            <div style={{padding: '10px'}}>
                                <p style={{fontWeight: 'bold', fontSize: '18px'}}>Enviado em:</p>
                                <p aria-label="Data de envio">**Data</p>
                                <p style={{fontWeight: 'bold', fontSize: '18px'}}>Prioridade: <span aria-label="Baixa prioridade">***Baixa</span></p>
                                <p style={{fontWeight: 'bold', fontSize: '18px'}}>Expira em <span aria-label="50 dias">**50 dias</span></p>
                            </div>
                        <Divider />
                        </div>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                        <div style={{width: '80%', height: 'fit-content'}}>
                        <Button variant="contained" color="error" startIcon={<CloseIcon />}>Cancelar solicitação</Button>
                        </div>
                    </div>
                </div>
                <div style={{width: '74%', height: '100vh', display: 'flex', justifyContent: 'center', overflow: 'auto', paddingBottom: "100px"}}>
                    <div style={{width: '80%'}}>
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                primary="Brunch this weekend?"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                        <div style={{marginTop: '30px', paddingBottom: '200px'}}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Enviar Mensagem"
                            fullWidth
                            multiline
                            rows={8}
                            />
                            <Paper elevation={3} style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px', backgroundColor: '#87d3f8'}} aria-label="Área de upload de arquivo">
                                <div style={{padding: '30px'}}>
                                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>
                                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} aria-label="Botão para selecionar um arquivo">
                                    Enviar arquivo
                                    <input hidden type="file" />
                                    </Button>
                                </div>
                                <h3 aria-label="Envie preferencialmente os arquivos em .zip">Envie preferencialmente os arquivos em .zip</h3>
                                </div>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}