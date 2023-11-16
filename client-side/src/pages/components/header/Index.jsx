/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import MoreIcon from "@mui/icons-material/MoreVert";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import AddIcon from "@mui/icons-material/Add";
import ChecklistIcon from "@mui/icons-material/Checklist";
import GroupIcon from "@mui/icons-material/Group";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LogoutIcon from "@mui/icons-material/Logout";
import Axios from 'axios';

import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const mobileMenuId = "primary-search-account-menu-mobile";
  const [openDrawer, setOpenDrawer] = useState(false);
  const [nomeUser, setNomeUser] = useState("");
  const [manterCatalogo, setManterCatalogo] = useState("");
  const [manterPermissoes, setManterPermissoes] = useState("");
  const [abrirChamados, setAbrirChamados] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    const getUser = async () => {
      await Axios.get(`${process.env.REACT_APP_DEFAULT_ROUTE}/api/usuario/${localStorage.getItem("id")}`, config).then(res => {
        setNomeUser(res.data.dados.name);
        setManterCatalogo(res.data.dados.permissoes.manter_catalogo);
        setManterPermissoes(res.data.dados.permissoes.manter_permissoes)
        setAbrirChamados(res.data.dados.permissoes.abrir_chamados)
      }).catch(err => {})
    }

    getUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(false);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key="novaSolicitacao" disablePadding  sx={{display: abrirChamados ? "flex" : "none"}}>
          <ListItemButton>
            <ListItemIcon>
              <AddIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="" />
            <ListItem>
              <Button
                color="success"
                size="small"
                variant="contained"
                onClick={() => navigate("../NovaSolicitacao")}
                aria-label="Nova Solicitação"
              >
                Nova Solicitação
              </Button>
            </ListItem>
          </ListItemButton>
        </ListItem>
        <ListItem key="minhasSolicitacoes" disablePadding>
          <ListItemButton onClick={() => navigate("../MinhasSolicitacoes")} aria-label="Minhas Solicitações">
            <ListItemIcon>
              <ChecklistIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Minhas Solicitações" />
          </ListItemButton>
        </ListItem>
        <ListItem key="meusAtendimentos" disablePadding>
          <ListItemButton onClick={() => navigate("../MeusAtendimentos")} aria-label="Meus Atendimentos">
            <ListItemIcon>
              <ChecklistIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Meus Atendimentos" />
          </ListItemButton>
        </ListItem>
        <ListItem key="solicitacoesArea" disablePadding>
          <ListItemButton onClick={() => navigate('../SolicitacoesArea')} aria-label="Solicitações da Área">
            <ListItemIcon>
              <RequestPageIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Solicitações da Área" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="usuariosGrupos" disablePadding sx={{display: manterPermissoes? "flex" : "none"}}>
          <ListItemButton
            onClick={() => navigate("../Configuracoes/Permissoes")} aria-label="Usuários e Grupos"
          >
            <ListItemIcon>
              <GroupIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Usuários e Grupos" />
          </ListItemButton>
        </ListItem>
        <ListItem key="catalogoServico" disablePadding sx={{display: manterCatalogo? 'flex' : 'none'}}>
          <ListItemButton onClick={() => navigate("../Configuracoes/Catalogo")} aria-label="Catálogos de Serviços">
            <ListItemIcon>
              <AccountTreeIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Catálogos de Serviços" />
          </ListItemButton>
        </ListItem>
        <Divider sx={{display: manterPermissoes && manterCatalogo ? "flex" : "none"}} />
        <ListItem key="sair" disablePadding>
          <ListItemButton
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("email");
              localStorage.removeItem("id");
              navigate("../Login");
            }}
            aria-label="Sair"
          >
            <ListItemIcon>
              <LogoutIcon sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar>
            {props.drawer ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="Abrir menu"
                sx={{ mr: 2 }}
                onClick={() => {
                  setOpenDrawer(true);
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              ""
            )}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              aria-label="Título do sistema: Sistema de Solicitações"
            >
              Sistema de Solicitações{" "}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: nomeUser ? "flex" : "none"}}>
              <IconButton disabled>
                <Chip
                  avatar={<Avatar>{nomeUser.slice(0, 1)}</Avatar>}
                  label={nomeUser}
                  sx={{ color: "white" }}
                  aria-label={`Nome do usuário: ${nomeUser}`}
                />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="Ver mais"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer("left", false)}
        aria-label="Navegação lateral"
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
