import React, { useState, useEffect } from "react";
import Header from "../components/header/Index";
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Axios from 'axios';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AreaRequestsInfo from "./components/areaRequestsInfo/Index";


export default function AreaRequests () {
    const [status, setStatus] = useState('');
    const [statusList, setStatusList] = useState([]);
    const [prioridade, setPrioridade] = useState("");
    const [prioridadeList, setPrioridadeList] = useState([]);
    const [assunto, setAssunto] = useState("");
    const [categoria, setCategoria] = useState("");
    const [areaSolicitante, setAreaSolicitante] = useState("");
    const [areaSolicitanteList, setAreaSolicitanteList] = useState([]);
    const [solicitacaoInfo,  setSolicitacaoInfo] = useState(false);
    const [idSolicitacao, setIdSolicitacao] = useState('');
    const [rows, setRows] = useState([])


    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

    useEffect(() => {
        const getInfos = async () => {
            await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/status`, config).then(res => {
                setStatusList(res.data.dados);
            }).catch(err => {});

            await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/prioridade`, config).then(res => {
                setPrioridadeList(res.data.dados);
            }).catch(err => {});

            await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/area/`, config).then(res => {
                setAreaSolicitanteList(res.data.dados);
            }).catch(err => {});
        }

        getInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setAssunto, assunto, categoria, setCategoria])

    useEffect(() => {
        const filterTable = async () => {
            await Axios.post(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/pedido/listar-pedidos`, {
                "tipo": "area",
                status_id: status,
                prioridade_id: prioridade,
                area_id: areaSolicitante
            }, config).then(res => {
                setRows(res.data.dados)
            }).catch(err => {})
        }

        filterTable()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, setStatus, prioridade, setPrioridade, areaSolicitante, setAreaSolicitante, solicitacaoInfo])


    return(
        <>
            {!solicitacaoInfo ? (
                <>
                    <Header drawer={true} />
                    <div style={{ width: "100%", height: "fit-content", display: 'flex', justifyContent: 'center' }}>
                    <div style={{width: '98%', height: 'fit-content'}}>
                    <div style={{ marginLeft: "50px", padding: "10px" }} aria-label="Solicitações > Solicitações da Área">
                        <h2>Solicitações {">"} Solicitações da Área</h2>
                    </div>
                        <Divider />
                        <div style={{width: '100%', height: 'fit-content', display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                            <div style={{width: '95%', display: 'flex', justifyContent: 'space-around'}}>
                                <div style={{width: '23%'}}>
                                    <FormControl fullWidth>
                                        <InputLabel>Status</InputLabel>
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
                                <div style={{width: '23%'}}>
                                    <FormControl fullWidth>
                                        <InputLabel>Prioridade</InputLabel>
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
                                <div style={{width: '23%'}}>
                                    <FormControl fullWidth>
                                        <InputLabel>Área Solicitante</InputLabel>
                                        <Select
                                        value={areaSolicitante}
                                        label="Área Solicitante"
                                        onChange={e => setAreaSolicitante(e.target.value)}
                                        >
                                        {areaSolicitanteList.map((areaSolicitante) => (
                                            <MenuItem value={areaSolicitante.id}>{areaSolicitante.titulo}</MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <TableContainer component={Paper} sx={{marginTop: '50px'}}>
                            <Table sx={{ minWidth: 650 }} aria-label="Tabela Serviços">
                                <TableHead>
                                <TableRow>
                                    <TableCell aria-label="Número">#</TableCell>
                                    <TableCell align="right" sx={{fontWeight: 'bold'}} aria-label="Enviado Em">Enviado Em</TableCell>
                                    <TableCell align="right" sx={{fontWeight: 'bold'}} aria-label="Área">Área</TableCell>
                                    <TableCell align="right" sx={{fontWeight: 'bold'}} aria-label="Assunto">Assunto</TableCell>
                                    <TableCell align="right" sx={{fontWeight: 'bold'}} aria-label="Responsável">Responsável</TableCell>
                                    <TableCell align="right" sx={{fontWeight: 'bold'}} aria-label="Status">Status</TableCell>
                                    <TableCell align="right" sx={{fontWeight: 'bold'}} aria-label="Prazo">Prazo</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', ":hover": {backgroundColor: '#cccccc'} }}
                                    onClick={e => {setIdSolicitacao(row.id); setSolicitacaoInfo(true)}}
                                    >
                                    <TableCell component="th" scope="row" aria-label={`Número: ${row.id}`}>{row.id}</TableCell>
                                    <TableCell align="right" aria-describedby={`pedidoEnviadoEm${row.id}`}>{row.enviado_em ? row.enviado_em.slice(8, 10) + "/" + row.enviado_em.slice(5, 7) + "/" + row.enviado_em.slice(0, 4) + " " + row.enviado_em.slice(11, 19) : "---"}</TableCell>
                                    <TableCell align="right" aria-label={`Área: ${row.area_pedido ? row.area_pedido : '---'}`}>{row.area_pedido ? row.area_pedido : "---"}</TableCell>
                                    <TableCell align="right" aria-label={`Assunto: ${row.assunto ? row.assunto : '---'}`}>{row.assunto ? row.assunto : "---"}</TableCell>
                                    <TableCell align="right" aria-label={`Responsável: ${row.responsavel ? row.responsavel : '---'}`}>{row.responsavel ? row.responsavel : "---"}</TableCell>
                                    <TableCell align="right" sx={{color: row.status === 'CANCELADO' ? "red" : row.status === "EM ATENDIMENTO" ? 'orange' : row.status === 'FINALIZADO' ? "green" : row.status === 'AGUARDANDO AVALIAÇÃO DO SOLICITANTE' ? "#6a63df" : 'black', fontWeight: 'bold', width: '150px'}} aria-label={`Status do Pedido: ${row.status}`}>{row.status ? row.status : "---"}</TableCell>
                                    <TableCell align="right" sx={{width: '150px'}} aria-label={`Status do Pedido: ${row.prazo}`}>{row.prazo.slice(8, 10) +"/"+ row.prazo.slice(5, 7) +"/"+ row.prazo.slice(0, 4) +" "+ row.prazo.slice(11, 20)}</TableCell>

                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </div>
                    </div>
                </>
            ) : (
                <AreaRequestsInfo idSolicitacao={idSolicitacao} setSolicitacaoInfo={setSolicitacaoInfo} />
            )}
        </>
    )
}