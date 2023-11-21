import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Divider from "@mui/material/Divider";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Axios from 'axios';
import SnackbarError from "../../../components/snackBarError/Index";
import { MaskPrazo } from "../../../../utils/mask/MascaraPrazo";

export default function InformacoesCategoria (props) { 
    const [prioridade, setPrioridade] = useState();
    const [ativarGrupoResponsavel, setAtivarGrupoResponsavel] = useState('');
    const [ativarGrupoAtendente, setAtivarGrupoAtendente] = useState(false);
    const [users, setUsers] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [prazo, setPrazo] = useState("");
    const [restricao, setRestricao] = useState(false);
    const [descricao, setDescricao] = useState('');
    const [responsavel, setResponsavel] = useState("");
    const [grupoResponsavel, setGrupoResponsavel] = useState(null);
    const [nomeCategoria, setNomeCategoria] = useState("");
    const [openSnackBarError, setOpenSnackBarError] = useState(false)
    const [mensagemSnackBarError, setMensagemSnackBarError] = useState("")

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    
    const handleChange = (event) => {
        setPrioridade(event.target.value);
    };

    useEffect(() => {
        const getUsersAndGroup = async () => {
            
            await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/categoria/${props.idCategoria}`, config).then(res => {
                console.log(res.data.dados.responsavel_id, res.data.dados.equipe_id)
                setNomeCategoria(res.data.dados.titulo)
                setPrazo(res.data.dados.prazo_horas ? res.data.dados.prazo_horas : "")
                setPrioridade(res.data.dados.prioridade_id);
                setRestricao(res.data.dados.restricao);
                setDescricao(res.data.dados.descricao);
                setAtivarGrupoAtendente(res.data.dados.responsavel_id ? true : res.data.dados.equipe_id ? true : false)
                setAtivarGrupoResponsavel(res.data.dados.responsavel_id ? "responsavel" : "grupo")
                setGrupoResponsavel(res.data.dados.grupo[0] ? res.data.dados.grupo[0].id : "")
                setResponsavel(res.data.dados.responsavel[0].id)
            }).catch(err => {})
            await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/usuario/equipe`, config).then(res => {
                res.data.map(us => (
                    setUsers(user => [...user, {label: "Desenvolvimento - " + us.name, id: us.id}])
                    ))
                }).catch(err => {});
            await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/grupo/listar/12`, config).then(res => {
                res.data.dados.map(gp => (
                    setGrupos(grupos => [...grupos, {label: "Grupo - " + gp.titulo, id: gp.id}])
                ))
            }).catch(err => {})
        }

        getUsersAndGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSaveCategoria = async () => {
        console.log(prazo)
        await Axios.put(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/categoria/${props.idCategoria}`, {
            descricao,
            prazo_horas: prazo,
            prioridade_id: prioridade,
            equipe_id: grupoResponsavel,
            responsavel_id: responsavel,
            restricao,
        }, config).then(res => {
            if(res.data.status) {
                props.setShowAssunto('assunto');
            }
        }).catch(err => {})
    }

    const validateInputs = () => {
        if(prazo) {
            if(prioridade) {
                if(descricao) {
                    handleSaveCategoria()
                } else {
                    setMensagemSnackBarError("Preencha a descrição!")
                    setOpenSnackBarError(true)
                }
            } else {
                setMensagemSnackBarError("Preencha a Prioridade!")
                setOpenSnackBarError(true)
            }
        } else {
            setMensagemSnackBarError("Preencha o prazo!")
            setOpenSnackBarError(true)
        }
    }

    const handleChangeResponsavel = (event) => {
      setResponsavel(event.target.value);
    };

    const handleChangeGrupo = (event) => {
        setGrupoResponsavel(event.target.value);
    }

    return(
        <>
            <div
                style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                }}
            >
                <p style={{ fontSize: "19px" }}>
                <b>Assunto</b> <b role="button" tabIndex={0} onClick={() => props.setShowAssunto('assunto')} style={{cursor: 'pointer', textDecoration: 'underline', color: 'blue'}}>{props.nomeAssunto}</b> <KeyboardArrowRightIcon sx={{fontSize: '15px', marginRight: '5px', marginLeft: '5px'}}/> <b role="button" tabIndex={0} onClick={() => props.setShowAssunto('assunto')} style={{cursor: 'pointer', textDecoration: 'underline', color: 'blue'}} aria-label={`Categoria: ${nomeCategoria}`}>{nomeCategoria}</b>
                </p>
            </div>
            <Divider />
            <div style={{marginTop: '20px', width: '100%', display: 'flex', marginBottom: '20px'}}>
                <div style={{width: '50%', height: 'fit-content', padding: '10px'}}>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
                        <TextField sx={{width: '49%'}} value={MaskPrazo(prazo)} onChange={e => setPrazo(e.target.value)} id="outlined-basic" label="Prazo de Finalização" placeholder="01:00:00" variant="outlined" />
                        <FormControl sx={{width: '49%'}}>
                            <InputLabel id="demo-simple-select-label">Prioridade</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={Number(prioridade)}
                            label="Prioridade"
                            onChange={handleChange}
                            >
                            <MenuItem value={1} aria-label="Prioridade Baixa">Baixa</MenuItem>
                            <MenuItem value={2} aria-label="Prioridade Média">Média</MenuItem>
                            <MenuItem value={3} aria-label="Prioridade Alta">Alta</MenuItem>
                            <MenuItem value={4} aria-label="Prioridade Muito Alta">Muito Alta</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Divider />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={e => setRestricao(e.target.checked)} checked={restricao} />} label="Chamado restrito (somente gestor)." />
                    </FormGroup>
                </div>
                <div style={{width: '50%', height: 'fit-content', padding: '10px'}}>
                    <div style={{marginBottom: '20px'}}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Insira uma breve descrição da categoria"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            multiline
                            rows={6}
                        /> 
                    </div>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={e => {setAtivarGrupoAtendente(e.target.checked)}} checked={ativarGrupoAtendente} />} label="Ativar Grupo ou Atendente responsável" />
                    </FormGroup>    
                    <Paper elevation={3} sx={{padding: '20px', marginTop: '10px', display: ativarGrupoAtendente === false ? "none" : "in-line"}}>
                        <FormControl>
                            <FormLabel>Selecione</FormLabel>
                                <RadioGroup row >
                                    <FormControlLabel value="responsavel" checked={ativarGrupoResponsavel === 'responsavel' ? true : false} onChange={e => {setAtivarGrupoResponsavel('responsavel'); setGrupoResponsavel('')}} control={<Radio />} label="Responsável" />
                                    <FormControlLabel value="grupo" checked={ativarGrupoResponsavel === 'grupo' ? true : false} onChange={e => {setAtivarGrupoResponsavel('grupo'); setResponsavel('')}} control={<Radio />} label="Grupo" />
                            </RadioGroup>
                        </FormControl>
                        <div style={{display: ativarGrupoResponsavel === "responsavel" ? 'flex': 'none'}}>
                        <FormControl margin="dense" fullWidth>
                            <InputLabel id="demo-simple-select-label">Responsável</InputLabel>
                            <Select
                                value={responsavel}
                                label="Responsavel"
                                onChange={handleChangeResponsavel}
                            >
                                {users.map(user => (
                                    <MenuItem value={user.id}>{user.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        </div>
                        <div style={{display: ativarGrupoResponsavel === "grupo" ? 'flex': 'none'}}>
                            <FormControl margin="dense" fullWidth>
                                <InputLabel id="demo-simple-select-label">Grupos</InputLabel>
                                <Select
                                    value={grupoResponsavel}
                                    label="Grupo"
                                    onChange={handleChangeGrupo}
                                >
                                    {grupos.map(grupo => (
                                        <MenuItem value={grupo.id}>{grupo.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </Paper>
                </div>
            </div>
            <Divider />
            <div style={{display: 'flex', justifyContent: 'flex-end', padding: '20px'}}>
                <Button variant="contained" endIcon={<CloudQueueIcon />} onClick={validateInputs} aria-label="Salvar">
                    salvar
                </Button>
            </div>
            <SnackbarError openSnackBarError={openSnackBarError} setOpenSnackBarError={setOpenSnackBarError} mensagemSnackBarError={mensagemSnackBarError} />
        </>
    )
}