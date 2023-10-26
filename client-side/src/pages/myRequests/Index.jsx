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
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Axios from "axios";

const columns = [
  { id: "name", label: "#", minWidth: 170 },
  { id: "code", label: "Enviado em", minWidth: 100 },
  {
    id: "population",
    label: "Setor/Área",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Responsável",
    minWidth: 170,
    align: "right",
  },
  {
    id: "density",
    label: "Status",
    minWidth: 170,
    align: "right",
  },
  {
    id: "density",
    label: "Prazo",
    minWidth: 170,
    align: "right",
  },
];

function createData(name, code, population, size, density) {
  return { name, code, population, size, density };
}

const rows = [
  createData("1", "20/09/2023", 'TI', 'Diel', 'OK'),
  createData("2", "20/09/2023", 'TI', 'Diel', 'OK'),
  createData("3", "20/09/2023", 'TI', 'Diel', 'OK'),
];

export default function MyRequests () {
    const [status, setStatus] = useState('');
    const [statusList, setStatusList] = useState([]);
    const [prioridade, setPrioridade] = useState("");
    const [prioridadeList, setPrioridadeList] = useState([]);
    const [responsavel, setResponsavel] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
        }

        getInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return(
        <>
            <Header drawer={true} />
            <div style={{ width: "100%", height: "200px", display: 'flex', justifyContent: 'center' }}>
            <div style={{width: '98%', height: 'fit-content'}}>
            <div style={{ marginLeft: "50px", padding: "10px" }}>
                <h2>Solicitações {">"} Minhas Solicitações</h2>
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
                                <InputLabel id="demo-simple-select-label">Responsável</InputLabel>
                                <Select
                                value={responsavel}
                                label="Responsável"
                                onChange={e => setResponsavel(e.target.value)}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
                    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: '40px' }}>
                        <TableContainer sx={{ maxHeight: 650 }}>
                            <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    >
                                    {column.label}
                                    </TableCell>
                                ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === "number"
                                                ? column.format(value)
                                                : value}
                                            </TableCell>
                                        );
                                        })}
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </div>
        </>
    )
}