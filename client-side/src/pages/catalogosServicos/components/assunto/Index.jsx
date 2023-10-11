import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CircleIcon from "@mui/icons-material/Circle";
import DialogCadastrarAssunto from "../dialogCadastrarCategoria/Index";
import DialogCadastrarCategoria from "../dialogCadastrarCategoria/Index";

export default function Assunto(props) {
  const [openCadastrarAssunto, setOpenCadastrarAssunto] = useState(false)
  const [openCadastrarCategoria, setOpenCadastrarCategoria] = useState(false)
  const [idAssunto, setIdAssunto] = useState('');
  const [categorias, setCategorias] = useState([]);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    const getCategorias = async () => {
      await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/assunto/${props.idAssunto}/categorias`, config).then(res => {
        setCategorias(res.data.dados)
      }).catch(err => {})
    };

    getCategorias();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.idAssunto, openCadastrarAssunto, setOpenCadastrarAssunto, openCadastrarCategoria, setOpenCadastrarCategoria]);

  const handleSwitch = async (event) => {
    props.setAtivo(event);
    await Axios.put(
      `${process.env.REACT_APP_DEFAULT_ROUTE}/api/assunto/${props.idAssunto}`,
      {
        ativo: event,
      },
      config
    )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: "19px" }}>
          <b>Assunto</b> {props.nomeAssunto}
        </p>
        <div style={{ marginTop: "10px" }}>
        <FormControlLabel
            control={<Switch />}
            checked={props.ativo}
            onChange={(e) => handleSwitch(e.target.checked)}
            label="Ativar"
            labelPlacement="start"
          />
          <Button sx={{marginLeft: '10px'}} variant="contained" startIcon={<AddIcon />} onClick={() => {setIdAssunto(props.idAssunto); setOpenCadastrarCategoria(true)}}>
            Adicionar Categoria
          </Button>
        </div>
      </div>
      <Divider />
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {categorias.map((categoria) => {
          return (
            <ListItem
              key={categoria.id}
              secondaryAction={
                <div>
                  
                  <FormControlLabel control={<Switch defaultChecked={categoria.ativo} />} />
                </div>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <CircleIcon sx={{ color: "red" }} />
                </ListItemAvatar>
                <ListItemText primary={categoria.titulo}/>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <DialogCadastrarCategoria openCadastrarCategoria={openCadastrarCategoria} setOpenCadastrarCategoria={setOpenCadastrarCategoria} idAssunto={idAssunto}  />
      <DialogCadastrarAssunto  />
    </>
  );
}
