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
import Alert from '@mui/material/Alert';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DialogCadastrarSubcategorias from "../dialogCadastrarSubcategorias/Index";

export default function Subcategorias (props) {
    const [subCategoriasList, setSubCategoriasList] = useState([])
    const [categoriaAtivo, setCategoriaAtivo] = useState('');
    const [openCadastrarSubcategoria, setOpenCadastrarSubcategoria] = useState(false)
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

    useEffect(() => {
        const getSubcategorias = async () =>{
            await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/categoria/${props.idCategoria}`, config).then(res => {
                props.setNomeSubcategoria(res.data.dados.titulo)
                setSubCategoriasList(res.data.dados.sub_categorias)
            }).catch(err => {})
        }

        getSubcategorias()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoriaAtivo, setCategoriaAtivo, setOpenCadastrarSubcategoria, openCadastrarSubcategoria])

    const handleSwitch = async (event, idSub) => {
        setCategoriaAtivo(true)
        await Axios.put(
            `${process.env.REACT_APP_DEFAULT_ROUTE}/api/sub_categoria/${idSub}`,
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

    return(
        <>
            <div
                style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                }}
            >
                <p style={{ fontSize: "19px" }}>
                <b>Assunto</b> <b onClick={() => props.setShowAssunto('assunto')} aria-label="Ir para a página de Assunto" style={{cursor: 'pointer', textDecoration: 'underline', color: 'blue'}}>{props.nomeAssunto}</b> <KeyboardArrowRightIcon sx={{fontSize: '15px', marginRight: '5px', marginLeft: '5px'}}/> <b aria-label="Nome da Subcategoria" style={{cursor: 'pointer', textDecoration: 'underline', color: 'blue'}}>{props.nomeSubcategoria}</b>
                </p>
                <div style={{ marginTop: "10px" }}>
                <Button sx={{marginLeft: '10px'}} variant="contained" startIcon={<AddIcon />} onClick={() => setOpenCadastrarSubcategoria(true)} aria-label="Adicionar Subcategoria">
                    Adicionar Subcategoria
                </Button>
                </div>
            </div>
            <Divider />
            <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {subCategoriasList.length === 0 ? (
            <Alert severity="warning" style={{ marginRight: '40px', textAlign: 'center'}} role="alert">Esta categoria não possui nenhuma subcategoria ativa, portanto não será exibida no catálogo de serviços. Adicione uma subcategoria para exibir este assunto em seu catálogo.</Alert>
        ) : (
            subCategoriasList.map((subcategoria) => {
                return (
                  <ListItem
                    key={subcategoria.id}
                    secondaryAction={
                      <div style={{display: 'flex'}}>
                        <FormControlLabel control={<Switch checked={subcategoria.ativo} onChange={e => {handleSwitch(e.target.checked, subcategoria.id)}} disabled={subcategoria.prioridade_id ? false : true} aria-label="Ativar/Desativar Subcategoria" label="Ativar/Desativar"/>} />
                      </div>
                    }   
                  >
                    <ListItemButton onClick={() => {props.setShowAssunto('informacaoSubcategoria'); props.setIdSubcategoria(subcategoria.id)}}>
                      <ListItemAvatar>
                        <CircleIcon sx={{ color: subcategoria.ativo ? "green": "red" }} aria-label={subcategoria.ativo ? 'Ativo' : 'Inativo'} />
                      </ListItemAvatar>
                      <ListItemText primary={subcategoria.titulo} secondary="Subcategoria"/>
                    </ListItemButton>
                    {subcategoria.prioridade_id ? "" : <Alert severity="warning" style={{ marginRight: '40px'}} aria-label="Adicionar informações básicas">Adicionar informações básicas.</Alert>}
                  </ListItem>
                );
              })
            )}
          </List>
          <DialogCadastrarSubcategorias openCadastrarSubcategoria={openCadastrarSubcategoria} setOpenCadastrarSubcategoria={setOpenCadastrarSubcategoria} idCategoria={props.idCategoria} />
        </>
    )
}