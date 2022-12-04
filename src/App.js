import { React } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
//Main Page
import Home from './pages/main/Home';

//Recon
import Dashboard from './pages/recon/Dashboard';

function App() {
  const domains = window.location.hostname.split(".");
  switch (domains[1]) {
    case 'recon':
      return (
        <BrowserRouter>
          <Routes>
            <Route index element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      );
    default:
      return (
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </BrowserRouter>
      );
  }
}

export default App;
