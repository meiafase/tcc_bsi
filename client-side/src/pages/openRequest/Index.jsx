import React from "react";
import HudAdmin from "../components/mainHud/Index";
import MainTable from "../components/mainTable/Index";

import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function openRequest() {
  return (
    <>
      <HudAdmin />
      <div style={{display: 'flex'}}>
        <div style={{ width: "100px", height: "200px"}}></div>
        <div style={{ width: "100%", height: "200px", display: 'flex', justifyContent: 'center' }}>
            <div style={{width: '98%', height: 'fit-content'}}>
                <h2>{"Solicitações > Minhas Solicitações"}</h2>
                <Divider />
                <div style={{width: '100%', height: 'fit-content', display: 'flex', marginBottom: '25px'}}>
                    <div style={{width: '30%', display: 'flex', justifyContent: 'space-evenly', height: '30px', marginTop: '10px'}}>
                        <Button variant="contained" size="small">todas</Button>
                        <Button variant="outlined" size="small">pendentes</Button>
                        <Button variant="outlined" size="small">agardando avalização</Button>
                        <Button variant="outlined" size="small">finalizadas</Button>
                        <Button variant="outlined" size="small">canceladas</Button>
                    </div>
                    <div style={{width: '70%', display: 'flex', justifyContent: 'flex-end'}}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', marginRight: '50px', width: '600px'}}>
                            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField sx={{width: '100%'}} size="small" label="Pesquisar..." variant="standard" />
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
