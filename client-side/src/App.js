import { Routes, Route } from 'react-router-dom';
import OpenRequest from './pages/openRequest/Index';
import MyService from './pages/myService/Index';
import Report from './pages/Report/Index';
import NewRequest from './pages/newRequest/Index';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<OpenRequest />} />
          <Route path="/MeusAtendimentos" element={<MyService />} />
          <Route path="/Relatorio" element={<Report />} />
          <Route path="/NovaSolicitacao" element={<NewRequest />} />
        </Routes>
    </div>
  );
}

export default App;
