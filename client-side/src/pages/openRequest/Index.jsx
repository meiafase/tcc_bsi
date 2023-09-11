import React, { useState } from "react";
import MainTable from "../components/mainTable/Index";

import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import FirstLogin from "../components/firstLogin/Index";
import SnackbarError from "../components/snackBarError/Index";
import SnackbarSuccess from "../components/snackBarSuccess/Index";
import Header from "../components/header/Index";

export default function OpenRequest() {

  const [openDialogFirstLogin, setOpenDialogFirstLogin] = useState(false);
  const [openSnackBarError, setOpenSnackBarError] = useState(false);
  const [mensagemSnackBarError, setMensagemSnackBarError] = useState("");

  const [openSnackBarSuccess, setOpenSnackBarSuccess] = useState(false);
  const [mensagemSnackBarSuccess, setMensagemSnackBarSuccess] = useState("");

  return (
    <>
      <Header drawer={true} />
        <div style={{ width: "100%", height: "200px", display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '98%', height: 'fit-content' }}>
            <h2>{"Solicitações > Minhas Solicitações"}</h2>
            <Divider />
            <div style={{ width: '100%', height: 'fit-content', display: 'flex', marginBottom: '25px' }}>
              <div style={{ width: '40%', display: 'flex', height: '30px', marginTop: '10px' }}>
                <Button variant="contained" size="small" sx={{ minWidth: '80px', marginRight: '10px' }}>todas</Button>
                <Button variant="outlined" size="small" sx={{ minWidth: '100px', marginRight: '10px' }}>pendentes</Button>
                <Button variant="outlined" size="small" sx={{ minWidth: '200px', marginRight: '10px' }}>agardando avalização</Button>
                <Button variant="outlined" size="small" sx={{ minWidth: '100px', marginRight: '10px' }}>finalizadas</Button>
                <Button variant="outlined" size="small" sx={{ minWidth: '100px', marginRight: '10px' }}>canceladas</Button>
              </div>
              <div style={{ width: '60%', display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginRight: '50px', width: '50%' }}>
                  <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField sx={{ width: '100%' }} size="small" label="Pesquisar..." variant="standard" aria-label="Campo de pesquisa" />
                </Box>
              </div>
            </div>
            <MainTable />
          </div>
        </div>
      <FirstLogin
        open={openDialogFirstLogin}
        setOpenDialogFirstLogin={setOpenDialogFirstLogin}
        setOpenSnackBarError={setOpenSnackBarError}
        setMensagemSnackBarError={setMensagemSnackBarError}
        setMensagemSnackBarSuccess={setMensagemSnackBarSuccess}
        setOpenSnackBarSuccess={setOpenSnackBarSuccess}
      />
      <SnackbarError openSnackBarError={openSnackBarError} setOpenSnackBarError={setOpenSnackBarError} mensagemSnackBarError={mensagemSnackBarError} />
      <SnackbarSuccess openSnackBarSuccess={openSnackBarSuccess} setOpenSnackBarSuccess={setOpenSnackBarSuccess} mensagemSnackBarSuccess={mensagemSnackBarSuccess} />
    </>
  );
}