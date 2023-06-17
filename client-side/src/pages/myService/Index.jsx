import React from "react";
import HudAdmin from "../components/mainHud/Index";
import MainTable from "../components/mainTable/Index";

import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function MyService() {
  return (
    <>
      <HudAdmin />
      <div style={{display: 'flex'}}>
        <div style={{ width: "100px", height: "200px"}}></div>
        <div style={{ width: "100%", height: "200px", display: 'flex', justifyContent: 'center' }}>
            <div style={{width: '98%', height: 'fit-content'}}>
                <h2>{"Solicitações > Meus Atendimentos"}</h2>
                <Divider />
                <div style={{width: '100%', height: 'fit-content', display: 'flex', marginBottom: '25px'}}>
                    <div style={{width: '40%', display: 'flex', height: '30px', marginTop: '10px'}}>
                        <Button variant="contained" size="small" sx={{minWidth: '80px', marginRight: '10px'}}>todas</Button>
                        <Button variant="outlined" size="small" sx={{minWidth: '100px', marginRight: '10px'}}>pendentes</Button>
                        <Button variant="outlined" size="small" sx={{minWidth: '200px', marginRight: '10px'}}>agardando avalização</Button>
                        <Button variant="outlined" size="small" sx={{minWidth: '100px', marginRight: '10px'}}>finalizadas</Button>
                        <Button variant="outlined" size="small" sx={{minWidth: '100px', marginRight: '10px'}}>canceladas</Button>
                    </div>
                    <div style={{width: '60%', display: 'flex', justifyContent: 'flex-end'}}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', marginRight: '50px', width: '50%'}}>
                            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField sx={{width: '100%'}} size="small" label="Pesquisar..." variant="standard" aria-label="Campo de pesquisa" />
                        </Box>
                    </div>
                </div>
                <MainTable />
            </div>
        </div>
      </div>
    </>
  );
}
