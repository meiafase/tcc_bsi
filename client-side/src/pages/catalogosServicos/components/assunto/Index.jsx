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
import DialogCadastrarCategoria from "../dialogCadastrarCategoria/Index";
import Alert from '@mui/material/Alert';

export default function Assunto(props) {
  const [openCadastrarAssunto, setOpenCadastrarAssunto] = useState(false)
  const [openCadastrarCategoria, setOpenCadastrarCategoria] = useState(false)
  const [idAssunto, setIdAssunto] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriaAtivo, setCategoriaAtivo] = useState();
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const handleSwitch = async (event, identificador, idCategoria) => {
    if(identificador === 'assunto') {
      props.setAtivo(event);
      await Axios.put(
        `${process.env.REACT_APP_DEFAULT_ROUTE}/api/assunto/${props.idAssunto}`,
        {
          ativo: event,
        },
        config
      )
        .then((res) => {
        })
        .catch((err) => {});
      } else {
        setCategoriaAtivo(true);
        await Axios.put(
          `${process.env.REACT_APP_DEFAULT_ROUTE}/api/categoria/${idCategoria}`,
          {
            ativo: event,
          },
          config
        )
          .then((res) => {
            setCategoriaAtivo(false);
          })
          .catch((err) => {});
      }
    }

  useEffect(() => {
    const getCategorias = async () => {
      await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/assunto/${props.idAssunto}/categorias`, config).then(res => {
        setCategorias(res.data.dados);
      }).catch(err => {})
    };

    getCategorias();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.idAssunto, openCadastrarAssunto, setOpenCadastrarAssunto, openCadastrarCategoria, setOpenCadastrarCategoria, categoriaAtivo]);

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
          <b id="assuntoLabel">Assunto</b>{" "}
          <b
            style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
            aria-labelledby="assuntoLabel"
            aria-label={`Assunto selecionado: ${props.nomeAssunto}`}
          >
            {props.nomeAssunto}
          </b>
        </p>
        <div style={{ marginTop: "10px" }}>
        <FormControlLabel
            control={<Switch />}
            checked={props.ativo}
            onChange={(e) => handleSwitch(e.target.checked, 'assunto')}
            label="Ativar"
            labelPlacement="start"
          />
          <Button sx={{marginLeft: '10px'}} variant="contained" startIcon={<AddIcon />} onClick={() => {setIdAssunto(props.idAssunto); setOpenCadastrarCategoria(true)}} aria-label="Adicionar Categoria">
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
                <div style={{display: 'flex'}}>
                  <FormControlLabel control={<Switch checked={categoria.ativo} onChange={(e) => handleSwitch(e.target.checked, 'categoria', categoria.id)} disabled={categoria.possui_subcategorias ? categoria.sub_categorias.length !== 0 ? false : true : categoria.prioridade_id ? false : true} />} />
                </div>
              }   
            >
              <ListItemButton onClick={categoria.possui_subcategorias ? () => {props.setShowAssunto('subcategorias'); props.setIdCategoria(categoria.id)} : () => {props.setShowAssunto('informacaoCategoria'); props.setIdCategoria(categoria.id)}} aria-label={`Categoria: ${categoria.titulo}`} aria-describedby={`categoriaStatus${categoria.id}`}>
                <ListItemAvatar>
                  <CircleIcon sx={{ color: categoria.ativo ? "green": "red" }} />
                </ListItemAvatar>
                <ListItemText primary={categoria.titulo} secondary={categoria.sub_categorias.length === 0 ? 'Não possui subcategorias' : categoria.sub_categorias.length + " subcategoria(s)"}/>
              </ListItemButton>
              {categoria.possui_subcategorias ? categoria.sub_categorias.length !== 0 ? "": <Alert severity="warning" style={{ marginRight: '40px'}} aria-label="Requer adição de subcategorias">Requer adição de subcategorias.</Alert> : categoria.prioridade_id ? "" : <Alert severity="warning" style={{ marginRight: '40px'}} aria-label="Adicionar informações básicas">Adicionar informações básicas.</Alert>}
            </ListItem>
          );
        })}
      </List>
      <DialogCadastrarCategoria openCadastrarCategoria={openCadastrarCategoria} setOpenCadastrarCategoria={setOpenCadastrarCategoria} idAssunto={idAssunto}  />
    </>
  );
}
