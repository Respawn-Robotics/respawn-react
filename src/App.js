import { React } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';

//Main Page
import Home from './pages/main/home/Home';
import Sponsors from './pages/main/sponsors/Sponsors';

//Recon
import Dashboard from './pages/recon/dashboard/Dashboard';
import Scout from './pages/recon/scout/Scout';


function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          {/* Main Page */}
          <Route index element={<Home />} />
          <Route path='/Sponsors' element={<Sponsors />} />
          {/* Recon */}
          <Route path='/recon/' element={<Dashboard />} />
          <Route path='/recon/scout' element={<Scout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
