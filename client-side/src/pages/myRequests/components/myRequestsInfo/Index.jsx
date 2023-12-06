import React, { useEffect, useState } from "react";
import Axios from 'axios';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkIcon from '@mui/icons-material/Link';
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
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import ListItemIcon from '@mui/material/ListItemIcon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Rating from '@mui/material/Rating';


import Header from "../../../components/header/Index";
import BackDrop from "../../../components/backdrop/Index";
import DialogHistorico from "../dialogHistorico/Index";
import DialogCancelarSolicitacao from "../dialogCancelarSolicitacao/Index";
import SnackbarError from "../../../components/snackBarError/Index";

export default function MyRequestsInfo (props) {

    const [nomeSolicitante, setNomeSolicitante] = useState("");
    const [emailSolicitante, setEmailSolicitante] = useState("");
    const [nomeResponsavel, setNomeResponsavel] = useState("");
    const [emailResponsavel, setEmailResponsavel] = useState("");
    const [origem, setOrigem] = useState("");
    const [assunto, setAssunto] = useState("");
    const [categoria, setCategoria] = useState("");
    const [subcategoria, setSubcategoria] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [prazoLimite, setPrazoLimite] = useState("");
    const [mensagens, setMensagens] = useState([]);
    const [novaMensagem, setNovaMensagem] = useState("");
    const [comentario, setComentario] = useState("");
    const [upload, setUpload] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false)
    const [status, setStatus] = useState("");
    const [openDialogCancelarSolicitacao, setOpenDialogCancelarSolicitacao] = useState(false)
    const [openDialogHistorico, setOpenDialogHistorico] = useState(false)
    const [value, setValue] = useState(0);
    const [nota, setNota] = useState("");
    const [openSnackBarError, setOpenSnackBarError] = useState(false);
    const [mensagemSnackBarError, setMensagemSnackBarError] = useState("");
    const [enviadoEm, setEnviadoEm] = useState("")
    const [justificativa, setJustificativa] = useState("");

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    useEffect(() => {
        const getSolicitacao = async () => {
            await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/pedido/${props.idSolicitacao}`, config).then(res => {
                console.log(res.data)
                setStatus(res.data.dados.status.descricao)
                setEnviadoEm(res.data.dados.data_criacao)
                setNomeSolicitante(res.data.dados.solicitante.name)
                setEmailSolicitante(res.data.dados.solicitante.email)
                setNomeResponsavel(res.data.dados.responsavel.name)
                setEmailResponsavel(res.data.dados.responsavel.email)
                setOrigem(res.data.dados.area.titulo)
                setAssunto(res.data.dados.assunto.titulo)
                setCategoria(res.data.dados.categoria.titulo)
                setPrioridade(res.data.dados.prioridade.descricao)
                setPrazoLimite(res.data.dados.prazo_limite)
                setMensagens(res.data.dados.mensagens)
                setNota(res.data.dados.nota_solicitante.split(".")[0])
                setSubcategoria(res.data.dados.sub_categoria ? res.data.dados.sub_categoria.titulo : false)
                setJustificativa(res.data.dados.avaliacao.justificativa)
            }).catch(err => {})
        }

        getSolicitacao()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.idSolicitacao, setOpenBackdrop, openBackdrop, openDialogCancelarSolicitacao, openDialogHistorico])

    const handleSaveInfos = async () => {
        setOpenBackdrop(true)
        let formData = new FormData();
        formData.append("mensagem", novaMensagem);
        if(upload) {
            formData.append("anexo[0]", upload[0]);
        }

        await Axios.post(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/pedido/${props.idSolicitacao}/mensagem/cadastrar`, formData, config, { headers: { "Content-Type": "multipart/form-data" } } ).then(res => {
            if(res.data.status) {
                setNovaMensagem("");
                setUpload(false);
                setOpenBackdrop(false)
              }
        }).catch(err => {})
    }

    const handleValidateInputs = () => {
        if(novaMensagem) {
            handleSaveInfos()
        } else {
            setMensagemSnackBarError("Insira uma mensagem!")
            setOpenSnackBarError(true);
        }
    }

    const handleDownloadAnexo = async (idMensagem, idAnexo) => {
        setOpenBackdrop(true)
        await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/pedido/mensagem/${idMensagem}/anexo/${idAnexo}/baixar`, config).then(async res => {
            const blob = new Blob([res.data], {type: "application/octet-stream"}) 
            const url = URL.createObjectURL(blob);
            window.open(url)
            setOpenBackdrop(false)
        })
        .catch(err => {
            setOpenBackdrop(false)
            setMensagemSnackBarError("Arquivo não encontrado!")
            setOpenSnackBarError(true);
        })
    }

    const handleAvaliar = async () => {
        setOpenBackdrop(true)
        await Axios.post(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/pedido/${props.idSolicitacao}/avaliacao`, {
            justificativa: comentario,
            nota: Number(value)
        }, config).then(res => {
            setOpenBackdrop(false)
        }).catch(err => {})
    }

    return(
        <>
            <Header drawer={true} />
            <div style={{ width: "100%", height: "fit-content", display: 'flex', justifyContent: 'center'}}>
                <div style={{width: '98%', height: 'fit-content'}}>
                    <div style={{ marginLeft: "50px", padding: "10px", display: 'flex' }}>
                        <p style={{ fontSize: "19px" }}>
                            <b style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={() => props.setSolicitacaoInfo(false)} >Minhas Solicitações</b>
                            <KeyboardArrowRightIcon sx={{fontSize: '15px', marginRight: '5px', marginLeft: '5px'}}/>
                            <b style={{marginRight: '20px'}} aria-label={`Número da Solicitação: ${props.idSolicitacao}`}>Solicitação {props.idSolicitacao}</b>
                        </p>
                        <p style={{marginRight: '20px'}}><Chip label={status} color="warning" /></p>
                        <Button variant="text" startIcon={<AccessTimeIcon />} onClick={() => setOpenDialogHistorico(true)}>
                            histórico da solicitação
                        </Button>
                    </div>
                    <Divider />
                </div>
            </div>
            <div style={{width: '100%', height: '80vh', marginTop: '30px', display: 'flex', justifyContent: 'space-between'}}>
                <div style={{width: '25%', height: '80vh', overflow: 'auto', paddingBottom: "100px"}}>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <div style={{width: '80%'}}>
                            <h3>Origem</h3>
                            <p>{origem}</p>
                        </div>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', textOverflow: 'ellipsis'}}>
                        <div style={{width: '80%', height: 'fit-content', border: "1px solid black", borderRadius: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            <div style={{padding: '10px', textOverflow: 'ellipsis'}}>
                                <p style={{fontWeight: 'bold', fontSize: '20px'}}>Solicitante <LinkIcon /></p>
                                <ListItem disablePadding>
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={nomeSolicitante} />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemIcon>
                                        <EmailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={emailSolicitante} />
                                </ListItem>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                        <div style={{width: '80%', height: 'fit-content', backgroundColor: '#87d3f8', borderRadius: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            <div style={{padding: '10px'}}>
                                <p style={{fontWeight: 'bold', fontSize: '20px'}} aria-label="Atendente">Atendente</p>
                                <ListItem disablePadding>
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={nomeResponsavel} />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemIcon>
                                        <EmailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={emailResponsavel} />
                                </ListItem>
                            </div>
                        </div>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                        <div style={{width: '80%', height: 'fit-content'}}>
                        <Divider />
                            <div style={{padding: '10px'}}>
                                <ListItemText sx={{padding: '5px'}} primary="Assunto" secondary={assunto} />
                                <ListItemText sx={{padding: '5px'}} primary="Categoria" secondary={categoria} />
                                {subcategoria ? (
                                    <ListItemText sx={{padding: '5px'}} primary="Sub-Categoria" secondary={subcategoria} />
                                ) : ""}
                            </div>
                        <Divider />
                        </div>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                        <div style={{width: '80%', height: 'fit-content'}}>
                            <div style={{padding: '10px'}}>
                                <ListItemText sx={{padding: '5px'}} primary="Enviado em:" secondary={enviadoEm.slice(8, 10)+"/"+enviadoEm.slice(5, 7)+"/"+enviadoEm.slice(0, 4)+" "+enviadoEm.slice(11, 19)} />
                                <ListItemText sx={{padding: '5px'}} primary="Prioridade:" secondary={prioridade} />
                                <div style={{width: '100%', justifyContent: 'space-between', marginTop: '20px', display: status === 'CANCELADO' || status === "AGUARDANDO AVALIAÇÃO DO SOLICITANTE" || status === 'FINALIZADO' ? 'none' : 'flex'}}>
                                    <b style={{fontSize: '18px', color: 'orange'}}>Expira em:</b>
                                    <b style={{fontSize: '18px', color: 'orange'}}>{prazoLimite.slice(8, 10)+"/"+prazoLimite.slice(5, 7)+"/"+prazoLimite.slice(0, 4)+" "+prazoLimite.slice(11, 20)}</b>
                                </div>
                                <div style={{width: '100%', height: '5px', backgroundColor: 'orange', borderRadius: '5px', marginBottom: '20px', display: status === 'CANCELADO' || status === 'AGUARDANDO AVALIAÇÃO DO SOLICITANTE' || status === 'FINALIZADO' ? 'none' : 'flex'}}></div>
                            </div>
                        <Divider />
                        </div>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                        <div style={{width: '80%', height: 'fit-content'}}>
                        <Button variant="contained" color="error" startIcon={<CloseIcon />} onClick={() => setOpenDialogCancelarSolicitacao(true)} sx={{ display: status === 'CANCELADO' || status === 'AGUARDANDO AVALIAÇÃO DO SOLICITANTE' || status === 'FINALIZADO' ? 'none' : 'flex'}}>Cancelar solicitação</Button>
                        </div>
                    </div>
                </div>
                <div style={{width: '74%', height: '100vh', display: 'flex', justifyContent: 'center', overflow: 'auto', paddingBottom: "100px"}}>
                    <div style={{width: '80%'}}>
                        <div style={{width: '100%', height: 'fit-content', padding: '20px', backgroundColor: '#87d3f8', borderRadius: '5px', display: status === "AGUARDANDO AVALIAÇÃO DO SOLICITANTE"  ? "" : "none"}}>
                            <h3 aria-label="Pergunta: Qual sua nota para este atendimento?">Qual sua nota para este atendimento?</h3>
                            <p aria-label="Instrução: Atribua uma nota ao atendimento.">Atribua uma nota ao atendimento.</p>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                setValue(newValue);
                                }}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Comentário"
                                margin="dense"
                                fullWidth
                                multiline
                                rows={4}
                                value={comentario}
                                onChange={e => setComentario(e.target.value)}
                            />
                            <div style={{marginTop: '30px'}}>
                                <Button variant="contained" endIcon={<ArrowRightAltIcon />} onClick={handleAvaliar} aria-label="Enviar avaliação">
                                    enviar
                                </Button>
                            </div>
                        </div>
                        {mensagens.map(mensagem => (
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                    <Avatar alt={mensagem.usuario.name} src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                    primary={
                                        <Typography sx={{fontWeight: 'bold'}}>
                                            {mensagem.usuario.name + "  " + mensagem.data_criacao.slice(8, 10) + "/" + mensagem.data_criacao.slice(5, 7) + "/" + mensagem.data_criacao.slice(0, 4) + " " + mensagem.data_criacao.slice(11, 19)}
                                        </Typography>
                                    }
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            fontSize="20px"
                                        >
                                            - {mensagem.mensagem}
                                        </Typography>
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                                <div style={{width: '100%', padding: '25px', backgroundColor: '#87d3f8', marginTop: '10px', marginBottom: '10px', display: mensagem.anexos[0] ? "flex" : "none", borderRadius: '5px'}}>
                                    <ListItem >
                                        <ListItemIcon>
                                            <IconButton onClick={() => handleDownloadAnexo(mensagem.id, mensagem.anexos[0].id)}>
                                                <div id="teste">

                                                </div>
                                                <AttachFileIcon sx={{color: 'blue'}} />
                                            </IconButton>
                                        </ListItemIcon>
                                        <ListItemText primary={mensagem.anexos[0] ? mensagem.anexos[0].nome_arquivo_completo : ""} />
                                    </ListItem>
                                </div>
                                <Divider variant="inset" component="li" />
                            </List>
                        ))}
                        
                        <div style={{marginTop: '30px', paddingBottom: '200px', display: status === 'CANCELADO' || status === 'AGUARDANDO AVALIAÇÃO DO SOLICITANTE' || status === 'FINALIZADO' ? 'none' : ''}}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Enviar Mensagem"
                            fullWidth
                            multiline
                            rows={8}
                            value={novaMensagem}
                            onChange={e => setNovaMensagem(e.target.value)}
                            />
                            <Paper elevation={3} style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px', backgroundColor: '#87d3f8'}} aria-label="Área de upload de arquivo">
                                <div style={{padding: '30px'}}>
                                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>
                                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} color={upload ? "success" : "error"} aria-label="Botão para selecionar um arquivo">
                                    {upload ? "Arquivo selecionado" : "Enviar arquivo"}
                                    <input hidden type="file" onChange={e => setUpload(e.target.files)} />
                                    </Button>
                                </div>
                                <h3 aria-label="Envie preferencialmente os arquivos em .zip">Envie preferencialmente os arquivos em .zip</h3>
                                </div>
                            </Paper>
                            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '30px'}}>
                            <Button variant="contained" color="success" onClick={handleValidateInputs} endIcon={<SendIcon />} aria-label="Enviar">
                                Enviar
                            </Button>
                            </div>
                        </div>
                        <div style={{width: '100%',display: 'flex', justifyContent: 'center', marginTop: '50px', paddingBottom: '100px'}}>
                            <p style={{display: status === 'CANCELADO' ? 'flex' : 'none', color: 'red', fontWeight: 'bold', fontSize: '20px'}}>Solicitação Cancelada.</p>
                            <p style={{display: status === 'AGUARDANDO AVALIAÇÃO DO SOLICITANTE' ? 'flex' : 'none', color: 'green', fontWeight: 'bold', fontSize: '20px'}}>Solicitação Finalizada.</p>
                            <div style={{display: status === 'FINALIZADO' ? '' : 'none', width: '100%', height: 'fit-content', padding: '30px', backgroundColor: '#87d3f8', borderRadius: '5px'}}>
                            <div>
                                <p><b>Avaliação do Solicitante</b>  
                                <Rating
                                    sx={{margin: '10px'}}
                                    name="simple-controlled"
                                    value={Number(nota)}
                                    readOnly 
                                />
                                </p>
                            </div>
                            <p><b>Justificativa: </b>{justificativa}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BackDrop openBackdrop={openBackdrop} />
            <DialogHistorico openDialogHistorico={openDialogHistorico} setOpenDialogHistorico={setOpenDialogHistorico} idSolicitacao={props.idSolicitacao} />
            <DialogCancelarSolicitacao openDialogCancelarSolicitacao={openDialogCancelarSolicitacao} setOpenDialogCancelarSolicitacao={setOpenDialogCancelarSolicitacao} idSolicitacao={props.idSolicitacao} />
            <SnackbarError openSnackBarError={openSnackBarError} setOpenSnackBarError={setOpenSnackBarError} mensagemSnackBarError={mensagemSnackBarError} />
        </>
    )
}