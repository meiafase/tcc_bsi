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
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Axios from 'axios';

export default function InformacoesSubcategoria (props) { 
    const [prioridade, setPrioridade] = useState();
    const [ativarGrupoResponsavel, setAtivarGrupoResponsavel] = useState('');
    const [ativarGrupoAtendente, setAtivarGrupoAtendente] = useState(false);
    const [users, setUsers] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [prazo, setPrazo] = useState("");
    const [restricao, setRestricao] = useState(false);
    const [descricao, setDescricao] = useState('');
    const [responsavel, setResponsavel] = useState(null);
    const [grupoResponsavel, setGrupoResponsavel] = useState(null);
    const [nomeSubcategoria, setNomeSubcategoria] = useState("");
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
    
    const handleChange = (event) => {
        setPrioridade(event.target.value);
    };

    useEffect(() => {
        const getUsersAndGroup = async () => {
            await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/sub_categoria/${props.idSubcategoria}`, config).then(res => {
                setNomeSubcategoria(res.data.dados.titulo);
                setPrazo(res.data.dados.prazo_horas);
                setPrioridade(res.data.dados.prioridade_id);
                setRestricao(res.data.dados.restricao);
                setDescricao(res.data.dados.descricao);
                console.log(res.data.dados);
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

    const handleSaveSubcategoria = async () => {
        await Axios.put(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/sub_categoria/${props.idSubcategoria}`, {
            descricao,
            prazo_horas: prazo,
            prioridade_id: prioridade,
            equipe_id: grupoResponsavel,
            responsavel_id: responsavel,
            restricao,
        }, config).then(res => {
            if(res.data.status) {
                props.setShowAssunto('subcategorias');
            }
        }).catch(err => {})
    }

    const validateInputs = () => {
        if(prazo) {
            if(prioridade) {
                if(descricao) {
                    handleSaveSubcategoria()
                } else {
                    alert('preencha a descricao')
                }
            } else {
                alert('Selecione  prioridade')
            }
        } else {
            alert('preencha o prazo')
        }
    }

    return(
        <>
        <h2>Informações da Subcategoria</h2>
        <fieldset>
        <legend>Assunto e Subcategoria</legend>
            <div
                style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                }}
            >
                <p style={{ fontSize: "19px" }}>
                    <b>Assunto </b>
                    <b onClick={() => props.setShowAssunto('assunto')} style={{cursor: 'pointer', textDecoration: 'underline', color: 'blue'}}>{props.nomeAssunto}</b>
                    <KeyboardArrowRightIcon sx={{fontSize: '15px', marginRight: '5px', marginLeft: '5px'}}/>
                    <b onClick={() => props.setShowAssunto('subcategorias')} style={{cursor: 'pointer', textDecoration: 'underline', color: 'blue'}}>{props.nomeSubcategoria}</b>
                    <KeyboardArrowRightIcon sx={{fontSize: '15px', marginRight: '5px', marginLeft: '5px'}}/>
                    <b style={{cursor: 'pointer', textDecoration: 'underline', color: 'blue'}}>{nomeSubcategoria}</b>
                </p>
            </div>
            </fieldset>
            <Divider />
            <div style={{marginTop: '20px', width: '100%', display: 'flex', marginBottom: '20px'}}>
                <div style={{width: '50%', height: 'fit-content', padding: '10px'}}>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
                    <FormControl><InputLabel id="prazo-label">Prazo de Finalização</InputLabel>
                    <TextField sx={{ width: '49%' }} value={prazo} onChange={e => setPrazo(e.target.value)} id="prazo" labelId="prazo-label" variant="outlined"/>
                    </FormControl>
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
                        <FormControlLabel control={<Checkbox onChange={e => {setAtivarGrupoAtendente(e.target.checked)}} />} label="Ativar Grupo ou Atendente responsável" />
                    </FormGroup>    
                    <Paper elevation={3} sx={{padding: '20px', marginTop: '10px', display: ativarGrupoAtendente === false ? "none" : "in-line"}}>
                        <FormControl>
                            <FormLabel>Selecione</FormLabel>
                                <RadioGroup row >
                                    <FormControlLabel value="responsavel" onChange={e => {setAtivarGrupoResponsavel('responsavel'); setGrupoResponsavel('')}} control={<Radio />} label="Responsável" />
                                    <FormControlLabel value="grupo" onChange={e => {setAtivarGrupoResponsavel('grupo'); setResponsavel('')}} control={<Radio />} label="Grupo" />
                            </RadioGroup>
                        </FormControl>
                        <div style={{display: ativarGrupoResponsavel === "responsavel" ? 'flex': 'none'}}>
                            <Autocomplete
                                fullWidth
                                disablePortal
                                onChange={(e, newValue) =>  setResponsavel(newValue.id)}
                                id="combo-box-demo"
                                options={users}
                                renderInput={(params) => <TextField {...params} label="Selecione o responsável"/>}
                            />
                        </div>
                        <div style={{display: ativarGrupoResponsavel === "grupo" ? 'flex': 'none'}}>
                            <Autocomplete
                                fullWidth
                                disablePortal
                                onChange={(e, newValue) => setGrupoResponsavel(newValue.id)}
                                id="combo-box-demo"
                                options={grupos}
                                renderInput={(params) => <TextField {...params} label="Selecione o grupo"/>}
                            />
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
        </>
    )
}