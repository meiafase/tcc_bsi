import { Routes, Route } from 'react-router-dom';
import OpenRequest from './pages/openRequest/Index';
import MyService from './pages/myService/Index';
import Report from './pages/Report/Index';
import NewRequest from './pages/newRequest/Index';
import Login from './pages/login/Index';
import HeaderTeste from './pages/components/header/Index'


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<OpenRequest />} />
          <Route path="/MeusAtendimentos" element={<MyService />} />
          <Route path="/Relatorio" element={<Report />} />
          <Route path="/NovaSolicitacao" element={<NewRequest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/header" element={<HeaderTeste />} />
        </Routes>
    </div>
  );
}

export default App;
