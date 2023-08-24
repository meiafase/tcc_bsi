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
import Paper from "@mui/material/Paper";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Divider from "@mui/material/Divider";
import { ValidateEmail } from "../../utils/email/ValidateEmail";
import SnackbarSuccess from "../components/snackBarError/Index";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Index";
import Axios from 'axios';

export default function Index() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorInput, setErrorInput] = useState(false);
  const [openSnackBarError, setOpenSnackBarError] = useState(false);
  const [mensagemSnackBarError, setMensagemSnackBarError] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSaveInfos = async () => {
    
    await Axios.post(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/login`, {
      email, password: senha
    }).then(res => {
      localStorage.setItem("token",res.data.token);
      navigate('../AbrirRequisicao')
    })
  }

  const handleValidateInputs = () => {
    if (ValidateEmail(email) === undefined && senha) {
      handleSaveInfos();
    } else {
      setMensagemSnackBarError("Preencha todos os campos corretamente!")
      setOpenSnackBarError(true)
      setErrorInput(true);
    }
  };

  return (
    <>
    <Header />
      <div
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          justifyContent: "center",
          marginTop: "200px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "35%",
            height: "fit-content",
            padding: "20px",
          }}
        >
          <div
            style={{ width: "100%", textAlign: "center", marginBottom: "20px" }}
          >
            <h1>LOGIN</h1>
            <Divider />
          </div>
          <FormControl
            sx={{ marginBottom: "20px" }}
            fullWidth
            variant="outlined"
            error={ValidateEmail(email)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <FormControl
            sx={{ marginBottom: "30px" }}
            fullWidth
            variant="outlined"
            error={errorInput}
            value={senha}
            onChange={(e) => {
              setErrorInput(false);
              setSenha(e.target.value);
            }}
          >
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
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100%" }}
              onClick={handleValidateInputs}
            >
              Entrar
            </Button>
          </div>
          
          <div
            style={{
              width: "100%",
              height: "fit-content",
              marginTop: "15px",
              textAlign: "right",
            }}
          >
            <Divider />
            <p style={{ fontSize: "20px" }}>
              Esqueceu sua senha?{" "}
              <Button
                variant="contained"
                size="small"
                startIcon={<OpenInNewIcon />}
              >
                Clique aqui
              </Button>
            </p>
          </div>
        </Paper>
      </div>
      <SnackbarSuccess
        openSnackBarError={openSnackBarError}
        setOpenSnackBarError={setOpenSnackBarError}
        mensagemSnackBarError={mensagemSnackBarError}
      />
    </>
  );
}
