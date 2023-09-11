import React from "react";

import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../components/header/Index";

export default function NewRequest() {
  return (
    <>
      <Header drawer={true} />
      <div
        style={{
          width: "100%",
          height: "200px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "98%", height: "fit-content" }}>
          <h2>{"Nova Solicitação"}</h2>
          <Divider />
          <div
            style={{
              width: "100%",
              height: "1000px",
              display: "flex",
              marginBottom: "25px",
              justifyContent: "center",
            }}
          >
            <div
              style={{ width: "30%", height: "fit-content", padding: "10px" }}
            >
              <FormControl fullWidth sx={{ marginTop: "20px" }}>
                <InputLabel>Setor</InputLabel>
                <Select label="Setor">
                  <MenuItem value={10}>Administrativo</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: "60px" }}>
                <InputLabel>Assunto</InputLabel>
                <Select label="Assunto">
                  <MenuItem value={10}>Administrativo</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: "60px" }}>
                <InputLabel>Categoria</InputLabel>
                <Select label="Categoria">
                  <MenuItem value={10}>Documentos</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: "60px" }}>
                <InputLabel>Sub Categoria</InputLabel>
                <Select label="Sub Categoria">
                  <MenuItem value={10}>Formulário Fornecedor</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ width: "50%", height: "200px", padding: "10px" }}>
              <TextField
                fullWidth
                label="Código do Cliente"
                helperText="Preenchimento Obrigatório"
                error="true"
                variant="outlined"
                sx={{ marginTop: "20px" }}
              />
              <TextField
                fullWidth
                label="Link do Formulário"
                helperText="Preenchimento Obrigatório"
                error="true"
                variant="outlined"
                sx={{ marginTop: "38px" }}
              />
              <TextField
                fullWidth
                label="Observação"
                variant="outlined"
                sx={{ marginTop: "38px" }}
                multiline
                rows={10}
              />
              <Paper
                elevation={15}
                sx={{
                  marginTop: "38px",
                  padding: "20px",
                  backgroundColor: "#e4f2f7",
                  marginBottom: "30px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="outlined" color="error" component="label">
                    Adicionar Anexo
                    <input type="file" hidden />
                  </Button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h2>Envie preferencialmente os arquivos em .zip</h2>
                </div>
              </Paper>
              <Divider />
              <Divider />
              <div
                style={{
                  width: "100%",
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="text"
                  color="error"
                  size="large"
                  startIcon={<CloseIcon />}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  endIcon={<SendIcon />}
                >
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
