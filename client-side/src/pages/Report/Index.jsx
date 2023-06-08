import React from "react";
import HudAdmin from "../components/mainHud/Index";

import Divider from "@mui/material/Divider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Report() {
  return (
    <>
      <HudAdmin />
      <div style={{ display: "flex" }}>
        <div style={{ width: "100px", height: "200px" }}></div>
        <div
          style={{
            width: "100%",
            height: "200px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "98%", height: "fit-content" }}>
            <h2>{"Relatórios"}</h2>
            <Divider />
            <div style={{ width: "100%", height: "100vh", display: "flex" }}>
              <div style={{ width: "30%", height: "100vh" }}>
                <div
                  style={{
                    width: "97%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker label="Período" />
                    </DemoContainer>
                  </LocalizationProvider>
                  <p style={{ marginTop: "20px" }}>a</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker label="Período" />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div style={{ width: "97%", marginTop: "30px" }}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select label="Status">
                      <MenuItem value={10}>OK</MenuItem>
                      <MenuItem value={20}>OK!</MenuItem>
                      <MenuItem value={30}>OK!!</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div
                  style={{
                    width: "97%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px",
                  }}
                >
                  <FormControl sx={{ width: "45%" }}>
                    <InputLabel>Prioridade</InputLabel>
                    <Select label="Prioridade">
                      <MenuItem value={10}>OK</MenuItem>
                      <MenuItem value={20}>OK!</MenuItem>
                      <MenuItem value={30}>OK!!</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "45%" }}>
                    <InputLabel>UF</InputLabel>
                    <Select label="UF">
                      <MenuItem value={10}>OK</MenuItem>
                      <MenuItem value={20}>OK!</MenuItem>
                      <MenuItem value={30}>OK!!</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div style={{ width: "97%", marginTop: "30px" }}>
                  <FormControl fullWidth>
                    <InputLabel>Atendente</InputLabel>
                    <Select label="Atendente">
                      <MenuItem value={10}>OK</MenuItem>
                      <MenuItem value={20}>OK!</MenuItem>
                      <MenuItem value={30}>OK!!</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div style={{ width: "97%", marginTop: "30px" }}>
                  <FormControl fullWidth>
                    <InputLabel>Assunto</InputLabel>
                    <Select label="Assunto">
                      <MenuItem value={10}>OK</MenuItem>
                      <MenuItem value={20}>OK!</MenuItem>
                      <MenuItem value={30}>OK!!</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div style={{ width: "97%", marginTop: "30px" }}>
                  <FormControl fullWidth>
                    <InputLabel>Categoria</InputLabel>
                    <Select label="Categoria">
                      <MenuItem value={10}>OK</MenuItem>
                      <MenuItem value={20}>OK!</MenuItem>
                      <MenuItem value={30}>OK!!</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div style={{ width: "97%", marginTop: "30px" }}>
                  <FormControl fullWidth>
                    <InputLabel>Área Solicitante</InputLabel>
                    <Select label="Área Solicitante">
                      <MenuItem value={10}>OK</MenuItem>
                      <MenuItem value={20}>OK!</MenuItem>
                      <MenuItem value={30}>OK!!</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div
                  style={{
                    width: "97%",
                    marginTop: "30px",
                    border: "solid 1px",
                    padding: "5px",
                    borderRadius: "10px",
                    backgroundColor: "#D7EDFF",
                    borderColor: '#D7EDFF'
                  }}
                >
                  <h2>Incluir no Relatório</h2>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Listagem Analítica"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Dados Sintéticos"
                  />
                </div>
                <div style={{ width: "97%", marginTop: "30px" }}>
                  <Button variant="contained" fullWidth size="large">Gerar relatório</Button>
                </div>
              </div>

              <div
                style={{
                  width: "70%",
                  height: "100vh",
                  borderLeft: 'solid 1px'
                }}
              >
                <h2>Visão Geral</h2>
                <Divider />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
