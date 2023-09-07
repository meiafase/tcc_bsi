import React, { useState } from "react";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DialogListaUsuarios from "../dialogListaUsuarios/Index";

export default function CadastrarUsuario() {
  const [openDialogListarUsuarios, setOpenDialogListarUsuarios] =
    useState(false);
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          marginBottom: "100px",
        }}
      >
        <div style={{ height: "500px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PersonAddAlt1Icon sx={{ fontSize: "200px", color: "#83d9f0" }} />
          </div>
          <Divider />
          <div style={{ textAlign: "center" }}>
            <h2>Nenhum integrante cadastrado</h2>
            <h4>Clique em "Adicionar Integrante" para adicionar ao grupo</h4>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialogListarUsuarios(true)}>
              Adicionar Integrante
            </Button>
          </div>
        </div>
      </div>
      <DialogListaUsuarios
        openDialogListarUsuarios={openDialogListarUsuarios}
        setOpenDialogListarUsuarios={setOpenDialogListarUsuarios}
      />
    </>
  );
}
