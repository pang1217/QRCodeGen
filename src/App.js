// import logo from './logo.svg';
import './App.css';
import GeneratePage from './components/GeneratePage';
import QRCodePage from './components/QRCodePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<GeneratePage />} />
        <Route path="/qrcode" element={<QRCodePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
