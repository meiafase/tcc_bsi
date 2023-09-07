import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from '@mui/material/Checkbox';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
];
export default function TableGruposUsuarios() {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Colaborador</TableCell>
              <TableCell align="right">Atender Chamados</TableCell>
              <TableCell align="right">Chamados Restritos</TableCell>
              <TableCell align="right">Relatórios</TableCell>
              <TableCell align="right">Catálogos Serviços</TableCell>
              <TableCell align="right">Gerenciar Permissões</TableCell>
              <TableCell align="right">Abertura Equipe</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right"><Checkbox onChange={e => console.log(e.target.checked)} /></TableCell>
                <TableCell align="right"><Checkbox /></TableCell>
                <TableCell align="right"><Checkbox /></TableCell>
                <TableCell align="right"><Checkbox /></TableCell>
                <TableCell align="right"><Checkbox /></TableCell>
                <TableCell align="right"><Checkbox /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
