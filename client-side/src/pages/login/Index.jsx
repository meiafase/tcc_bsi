import React, { useState } from "react";

import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Paper from '@mui/material/Paper';

export default function Index() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          justifyContent: "center",
          marginTop: '200px',
        }}
      >
        <Paper
        elevation={3}
          sx={{
            width: "35%",
            height: "400px",
            padding: "20px",
          }}
        >
          <div
            style={{ width: "100%", textAlign: "center", marginBottom: "50px" }}
          >
            <h1>LOGIN</h1>
          </div>
          <FormControl
            sx={{ marginBottom: "20px" }}
            fullWidth
            variant="outlined"
          >
            <InputLabel>E-mail</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
              label="E-mail"
            />
          </FormControl>
          <FormControl sx={{marginBottom: '30px'}} fullWidth variant="outlined">
            <InputLabel>Senha</InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Senha"
            />
          </FormControl>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button variant="contained" color="success" sx={{width: '50%'}}>Login</Button>
          </div>
        </Paper>
      </div>
    </>
  );
}
