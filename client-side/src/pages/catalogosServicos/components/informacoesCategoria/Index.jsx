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
import Axios from 'axios';


export default function InformacoesCategoria (props) { 
    const [prioridade, setPrioridade] = useState('baixa');
    const [ativarGrupoResponsavel, setAtivarGrupoResponsavel] = useState('');
    const [users, setUsers] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
    
    const handleChange = (event) => {
        setPrioridade(event.target.value);
    };

    useEffect(() => {
        const getUsersAndGroup = async () => {
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
                    <b>Assunto</b> {props.nomeAssunto} {' > nome*'}
                </p>
            </div>
            <Divider />
            <div style={{marginTop: '20px', width: '100%', display: 'flex', marginBottom: '20px'}}>
                <div style={{width: '50%', height: 'fit-content', padding: '10px'}}>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
                        <TextField sx={{width: '49%'}} id="outlined-basic" label="Prazo de Finalização" variant="outlined" />
                        <FormControl sx={{width: '49%'}}>
                            <InputLabel id="demo-simple-select-label">Prioridade</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={prioridade}
                            label="Prioridade"
                            onChange={handleChange}
                            >
                            <MenuItem value={'baixa'}>Baixa</MenuItem>
                            <MenuItem value={'media'}>Média</MenuItem>
                            <MenuItem value={'alta'}>Alta</MenuItem>
                            <MenuItem value={'muitoAlta'}>Muito Alta</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Divider />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Chamado restrito (somente gestor)." />
                        <FormControlLabel control={<Checkbox />} label="Incluir campo para dados adicionais." />
                    </FormGroup>    
                </div>
                <div style={{width: '50%', height: 'fit-content', padding: '10px'}}>
                    <div style={{marginBottom: '20px'}}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Insira uma breve descrição da categoria"
                            multiline
                            rows={6}
                        /> 
                    </div>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Ativar Grupo ou Atendente responsável" />
                    </FormGroup>    
                    <Paper elevation={3} sx={{padding: '20px', marginTop: '10px'}}>
                        <FormControl>
                            <FormLabel>Selecione</FormLabel>
                                <RadioGroup row >
                                    <FormControlLabel value="responsavel" onChange={e => setAtivarGrupoResponsavel('responsavel')} control={<Radio />} label="Responsável" />
                                    <FormControlLabel value="grupo" onChange={e => setAtivarGrupoResponsavel('grupo')} control={<Radio />} label="Grupo" />
                            </RadioGroup>
                        </FormControl>
                        <div style={{display: ativarGrupoResponsavel === "responsavel" ? 'flex': 'none'}}>
                            <Autocomplete
                                fullWidth
                                disablePortal
                                id="combo-box-demo"
                                options={users}
                                renderInput={(params) => <TextField {...params} label="Selecione o responsável"/>}
                            />
                        </div>
                        <div style={{display: ativarGrupoResponsavel === "grupo" ? 'flex': 'none'}}>
                            <Autocomplete
                                fullWidth
                                disablePortal
                                id="combo-box-demo"
                                
                                options={grupos}
                                renderInput={(params) => <TextField {...params} label="Selecione o grupo"/>}
                            />
                        </div>
                    </Paper>
                </div>
            </div>
            <Divider />
        </>
    )
}