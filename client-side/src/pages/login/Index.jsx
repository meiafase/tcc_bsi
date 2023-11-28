import React, { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { ValidateEmail } from "../../utils/email/ValidateEmail";
import SnackbarSuccess from "../components/snackBarError/Index";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Index";
import Axios from "axios";
import TextField from "@mui/material/TextField";

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

  useEffect(() => {
    const verifySession = async () => {
      let token = localStorage.getItem("token");
      if (token) {
        navigate("../MinhasSolicitacoes");
      }
    };
    verifySession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveInfos = async () => {
    await Axios.post(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/login`, {
      email,
      password: senha,
    })
      .then((res) => {
        localStorage.setItem("token", res.data.dados.token);
        localStorage.setItem("id", res.data.dados.usuario.id);
        localStorage.setItem("email", res.data.dados.usuario.email);
        navigate("../MinhasSolicitacoes");
      })
      .catch((err) => {
        setMensagemSnackBarError("Algo deu errado ao tentar fazer o login!");
        setOpenSnackBarError(true);
        setErrorInput(true);
      });
  };

  const handleValidateInputs = () => {
    if (ValidateEmail(email) === undefined && senha) {
      handleSaveInfos();
    } else {
      setMensagemSnackBarError("Preencha todos os campos corretamente!");
      setOpenSnackBarError(true);
      setErrorInput(true);
    }
  };

  return (
    <>
      <Header drawer={false} />
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
            <h1 aria-label="Título da Página: Login">LOGIN</h1>
            <Divider />
          </div>
          <TextField
            sx={{ marginBottom: "20px" }}
            fullWidth
            label="E-mail"
            variant="outlined"
            error={ValidateEmail(email)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
            <InputLabel aria-label="Campo de Senha: Insira sua senha">Senha</InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
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
              aria-label="Clique aqui para efetuar o login"
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
