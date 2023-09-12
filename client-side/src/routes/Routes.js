import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import OpenRequest from "../pages/openRequest/Index";
import MyService from "../pages/myService/Index";
import Report from "../pages/Report/Index";
import NewRequest from "../pages/newRequest/Index";
import Login from "../pages/login/Index";
import UsuariosGrupos from '../pages/usuariosGrupos/Index';

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AbrirRequisicao" element={<OpenRequest />} />
        <Route path="/MeusAtendimentos" element={<MyService />} />
        <Route path="/Relatorio" element={<Report />} />
        <Route path="/NovaSolicitacao" element={<NewRequest />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Configuracoes/Permissoes" element={<UsuariosGrupos />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
