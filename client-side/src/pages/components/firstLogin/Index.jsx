import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FirstLogin(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erroSenha, setErroSenha] = useState(false);

  const validateInputs = () => {
    if (senha && confirmarSenha) {
      if (senha.length >= 8 && confirmarSenha.length >= 8) {
        if (senha === confirmarSenha) {
          alert('OK')
        } else {
          props.setMensagemSnackBarError("As senhas não conferem!");
          props.setOpenSnackBarError(true);
          setErroSenha(true);
        }
      } else {
        props.setMensagemSnackBarError(
          "A senha precisa ter no mínimo 8 caracteres!"
        );
        props.setOpenSnackBarError(true);
        setErroSenha(true);
      }
    } else {
      props.setMensagemSnackBarError("Preencha os campos corretamente!");
      props.setOpenSnackBarError(true);
      setErroSenha(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordTwo = () => setShowPasswordTwo((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPasswordTwo = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Dialog open={props.open} TransitionComponent={Transition} keepMounted>
        <DialogTitle>{"Primeiro acesso!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Altere a sua senha."}
            <FormControl margin="dense" fullWidth variant="outlined" sx={{marginTop: '20px'}}>
              <InputLabel>Senha</InputLabel>
              <OutlinedInput
                error={erroSenha}
                onChange={(e) => {setErroSenha(false); setSenha(e.target.value)}}
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
            <FormControl margin="dense" fullWidth variant="outlined">
              <InputLabel>Confirmar Senha</InputLabel>
              <OutlinedInput
                error={erroSenha}
                onChange={(e) => {setErroSenha(false); setConfirmarSenha(e.target.value)}}
                type={showPasswordTwo ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPasswordTwo}
                      onMouseDown={handleMouseDownPasswordTwo}
                      edge="end"
                    >
                      {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirmar Senha"
              />
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={validateInputs}
            size="large"
            color="success"
            variant="contained"
          >
            Salvar senha
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
