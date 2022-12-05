import { React } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
//Main Page
import Home from './pages/main/Home';

//Recon
import Dashboard from './pages/recon/dashboard/Dashboard';
import Scout from './pages/recon/scout/Scout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Page */}
        <Route index element={<Home />} />

        {/* Recon */}
        <Route path='/recon/' element={<Dashboard />} />
        <Route path='/recon/scout' element={<Scout />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
