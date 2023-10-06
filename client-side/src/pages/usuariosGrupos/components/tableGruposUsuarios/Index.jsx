import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from '@mui/material/Checkbox';
import Axios from 'axios';

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

export default function TableGruposUsuarios() {
  const [users, setUsers] = useState([]);
  const [attUser, setAttUser] = useState(false);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/usuario/equipe`, config).then(res =>{
      setUsers(res.data);
    }).catch(err => {})
  }, [attUser, setAttUser])

  const handleAbrirChamados = async (event, id, area_id) => {
    await Axios.put(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/usuario/permissoes/${id}`, {
      area_id,
      abrir_chamados: event
    }, config).then(res => {setAttUser(true)}).catch(err =>{})
    setAttUser(false)
  }

  const handleAbrirChamadosRestritos = async (event, id, area_id) => {
    await Axios.put(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/usuario/permissoes/${id}`, {
      area_id,
      abrir_chamados_restritos: event
    }, config).then(res => {setAttUser(true)}).catch(err =>{})
    setAttUser(false)
  }

  const handleAtenderChamados = async (event, id, area_id) => {
    await Axios.put(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/usuario/permissoes/${id}`, {
      area_id,
      atender_chamados: event
    }, config).then(res => {setAttUser(true)}).catch(err =>{})
    setAttUser(false)
  }
  const handleRelatorios = async (event, id, area_id) => {
    await Axios.put(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/usuario/permissoes/${id}`, {
      area_id,
      relatorios: event
    }, config).then(res => {setAttUser(true)}).catch(err =>{})
    setAttUser(false)
  }
  const handleManterCatalogo = async (event, id, area_id) => {
    await Axios.put(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/usuario/permissoes/${id}`, {
      area_id,
      manter_catalogo: event
    }, config).then(res => {setAttUser(true)}).catch(err =>{})
    setAttUser(false)
  }
  const handleManterPermissoes = async (event, id, area_id) => {
    await Axios.put(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/usuario/permissoes/${id}`, {
      area_id,
      manter_permissoes: event
    }, config).then(res => {setAttUser(true)}).catch(err =>{})
    setAttUser(false)
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Colaborador</TableCell>
              <TableCell align="right">Abrir Chamados</TableCell>
              <TableCell align="right">Abrir Chamados Restritos</TableCell>
              <TableCell align="right">Atender Chamados</TableCell>
              <TableCell align="right">Relatórios</TableCell>
              <TableCell align="right">Manter Catálogo</TableCell>
              <TableCell align="right">Manter Permissões</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              user.permissoes? (
                <TableRow
                key={user.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right"><Checkbox onChange={e => handleAbrirChamados(e.target.checked, user.id, user.area_id)} defaultChecked={user.permissoes.abrir_chamados === 1? true: false} /></TableCell>
                <TableCell align="right"><Checkbox onChange={e => handleAbrirChamadosRestritos(e.target.checked, user.id, user.area_id)} defaultChecked={user.permissoes.abrir_chamados_restritos === 1? true: false} /></TableCell>
                <TableCell align="right"><Checkbox onChange={e => handleAtenderChamados(e.target.checked, user.id, user.area_id)} defaultChecked={user.permissoes.atender_chamados === 1? true: false} /></TableCell>
                <TableCell align="right"><Checkbox onChange={e => handleRelatorios(e.target.checked, user.id, user.area_id)} defaultChecked={user.permissoes.relatorios === 1? true: false} /></TableCell>
                <TableCell align="right"><Checkbox onChange={e => handleManterCatalogo(e.target.checked, user.id, user.area_id)} defaultChecked={user.permissoes.manter_catalogo === 1? true: false} /></TableCell>
                <TableCell align="right"><Checkbox onChange={e => handleManterPermissoes(e.target.checked, user.id, user.area_id)} defaultChecked={user.permissoes.manter_permissoes === 1? true: false} /></TableCell>
              </TableRow>
              ) : ("") 
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
