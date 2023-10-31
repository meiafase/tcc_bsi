import React, { useState, useEffect } from "react";
import Header from "../components/header/Index";
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Axios from 'axios';


export default function MyService () {
    const [status, setStatus] = useState('');
    const [statusList, setStatusList] = useState([]);
    const [prioridade, setPrioridade] = useState("");
    const [prioridadeList, setPrioridadeList] = useState([]);
    const [solicitante, setSolicitante] = useState("");
    const [solicitanteList, setSolicitanteList] = useState([]);
    const [rows, setRows] = useState([]);

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

    useEffect(() => {
        const getInfos = async () => {
            await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/status`, config).then(res => {
                console.log(res.data.dados)
                setStatusList(res.data.dados);
            }).catch(err => {});

            await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/prioridade`, config).then(res => {
                setPrioridadeList(res.data.dados);
            }).catch(err => {});

            await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/pedido/filtrar/1`, config).then(res => {
                setSolicitanteList(res.data.dados);
            }).catch(err => {});
        }

        getInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const filterTable = async () => {
            await Axios.post(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/pedido/listar-pedidos`, {
                "tipo": "minhas",
                status_id: status,
                prioridade_id: prioridade,
                solicitante_id: solicitante
            }, config).then(res => {
                setRows(res.data.dados)
            }).catch(err => {})
        }

        filterTable()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, setStatus, prioridade, setPrioridade, solicitante, setSolicitante])


    return(
        <>
            <Header drawer={true} />
            <div style={{ width: "100%", height: "200px", display: 'flex', justifyContent: 'center' }}>
            <div style={{width: '98%', height: 'fit-content'}}>
            <div style={{ marginLeft: "50px", padding: "10px" }}>
                <h2>Solicitações {">"} Meus Atendimentos</h2>
            </div>
                <Divider />
                <div style={{width: '100%', height: 'fit-content', display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                    <div style={{width: '95%', display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '30%'}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                value={status}
                                label="Status"
                                onChange={e => setStatus(e.target.value)}
                                >
                                {statusList.map((status) => (
                                    <MenuItem value={status.id}>{status.descricao}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{width: '30%'}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Prioridade</InputLabel>
                                <Select
                                value={prioridade}
                                label="Prioridade"
                                onChange={e => setPrioridade(e.target.value)}
                                >
                                {prioridadeList.map((prioridade) => (
                                    <MenuItem value={prioridade.id}>{prioridade.descricao}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{width: '30%'}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Solicitante</InputLabel>
                                <Select
                                value={solicitante}
                                label="Solicitante"
                                onChange={e => setSolicitante(e.target.value)}
                                >
                                {solicitanteList.map((prioridade) => (
                                    <MenuItem value={prioridade.id}>{prioridade.name}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <TableContainer component={Paper} sx={{marginTop: '50px'}}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="right" sx={{fontWeight: 'bold'}}>Enviado Em</TableCell>
                            <TableCell align="right" sx={{fontWeight: 'bold'}}>Área</TableCell>
                            <TableCell align="right" sx={{fontWeight: 'bold'}}>Assunto</TableCell>
                            <TableCell align="right" sx={{fontWeight: 'bold'}}>Responsável</TableCell>
                            <TableCell align="right" sx={{fontWeight: 'bold'}}>Status</TableCell>
                            <TableCell align="right" sx={{fontWeight: 'bold'}}>Prazo</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', ":hover": {backgroundColor: '#cccccc'} }}
                            onClick={e => alert(row.id)}
                            >
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell align="right">{row.enviado_em ? row.enviado_em : "---"}</TableCell>
                            <TableCell align="right">{row.area_pedido ? row.area_pedido : "---"}</TableCell>
                            <TableCell align="right">{row.assunto ? row.assunto : "---"}</TableCell>
                            <TableCell align="right">{row.responsavel ? row.responsavel : "---"}</TableCell>
                            <TableCell align="right" sx={{color: 'orange', fontWeight: 'bold'}}>{row.status ? row.status : "---"}</TableCell>
                            <TableCell align="right" sx={{color: 'red', fontWeight: 'bold'}}>{row.prazo ? row.prazo : "---"}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    )
}