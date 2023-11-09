import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import MyService from "../pages/myService/Index";
import MyRequests from "../pages/myRequests/Index";
import Report from "../pages/Report/Index";
import NewRequest from "../pages/newRequest/Index";
import Login from "../pages/login/Index";
import UsuariosGrupos from '../pages/usuariosGrupos/Index';
import CatalogoServico from '../pages/catalogosServicos/Index';
import AreaRequests from "../pages/areaRequests/Index";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/MinhasSolicitacoes" element={<MyRequests />} />
        <Route path="/MeusAtendimentos" element={<MyService />} />
        <Route path="/SolicitacoesArea" element={<AreaRequests />} />
        <Route path="/Relatorio" element={<Report />} />
        <Route path="/NovaSolicitacao" element={<NewRequest />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Configuracoes/Permissoes" element={<UsuariosGrupos />} />
        <Route path="/Configuracoes/Catalogo" element={<CatalogoServico />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
