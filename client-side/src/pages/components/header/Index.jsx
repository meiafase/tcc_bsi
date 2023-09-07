/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
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
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AddIcon from "@mui/icons-material/Add";
import ChecklistIcon from "@mui/icons-material/Checklist";
import GroupIcon from "@mui/icons-material/Group";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import { useNavigate } from "react-router-dom";

export default function Header() {
  const mobileMenuId = "primary-search-account-menu-mobile";
  const [openDrawer, setOpenDrawer] = useState(false);

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
        <ListItem key="novaSolicitacao" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AddIcon sx={{ color: "#8A2FFE" }} />
            </ListItemIcon>
            <ListItemText primary="" />
            <ListItem>
              <Button color="success" size="small" variant="contained">
                Nova Solicitação
              </Button>
            </ListItem>
          </ListItemButton>
        </ListItem>
        <ListItem key="minhasSolicitacoes" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ChecklistIcon sx={{ color: "#8A2FFE" }} />
            </ListItemIcon>
            <ListItemText primary="Minhas Solicitações" />
          </ListItemButton>
        </ListItem>
        <ListItem key="meusAtendimentos" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ChecklistIcon sx={{ color: "#8A2FFE" }} />
            </ListItemIcon>
            <ListItemText primary="Meus Atendimentos" />
          </ListItemButton>
        </ListItem>
        <ListItem key="solicitacoesArea" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <RequestPageIcon sx={{ color: "#8A2FFE" }} />
            </ListItemIcon>
            <ListItemText primary="Solicitações da Área" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="configuracoes">
          <ListItemButton disabled>
            <ListItemText primary="Configurações" />
          </ListItemButton>
        </ListItem>
        <ListItem key="relatorios" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <QueryStatsIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Relatórios" />
          </ListItemButton>
        </ListItem>
        <ListItem key="usuariosGrupos" disablePadding>
          <ListItemButton
            onClick={() => navigate("../Configuracoes/Permissoes")}
          >
            <ListItemIcon>
              <GroupIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Usuários e Grupos" />
          </ListItemButton>
        </ListItem>
        <ListItem key="catalogoServico" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountTreeIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Catálogos de Serviços" />
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
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Sistema de Solicitações{" "}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton disabled>
                <Chip
                  avatar={<Avatar>S</Avatar>}
                  label="Samuel"
                  sx={{ color: "white" }}
                />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
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
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
