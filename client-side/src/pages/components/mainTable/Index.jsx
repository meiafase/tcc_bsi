import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

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

export default function MainTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 650 }}>
        <Table stickyHeader aria-label="Tabela de Dados Importantes" summary="Tabela de dados com informações importantes">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  aria-label={column.label}
                  scope="col"
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
                        <TableCell key={column.id} align={column.align} aria-label={`Célula ${column.label}: ${value}`}>
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
        labelRowsPerPage="Linhas por página:"
      />
    </Paper>
  );
}
