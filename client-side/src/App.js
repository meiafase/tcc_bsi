import { Routes, Route } from 'react-router-dom';
import OpenRequest from './pages/openRequest/Index';
import MyService from './pages/myService/Index';
import Report from './pages/Report/Index';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/MinhasSolicitacoes" element={<OpenRequest />} />
          <Route path="/MeusAtendimentos" element={<MyService />} />
          <Route path="/Relatorio" element={<Report />} />
        </Routes>
    </div>
  );
}

export default App;
