import { React } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

// Main Page
import Home from './pages/main/home/Home';
import Sponsors from './pages/main/sponsors/Sponsors';
import About from './pages/main/about/About';
import Outreach from './pages/main/outreach/Outreach';

// Recon
import Dashboard from './pages/recon/dashboard/Dashboard';
import Scout from './pages/recon/scout/Scout';

// Reflect
import Reflect from './pages/reflect/home/Reflect'
import Record from './pages/reflect/record/Record'
import Legacy from './pages/reflect/legacy/Legacy'
import Daily from './pages/reflect/daily/Daily'

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          {/* Main Page */}
          <Route index element={<Home />} />
          <Route path='/Sponsors' element={<Sponsors />} />
          <Route path='/About' element={<About/>}/>
          <Route path='/Outreach' element={<Outreach/>}/>
          {/* Recon */}
          <Route path='/recon/' element={<Dashboard />} />
          <Route path='/recon/scout' element={<Scout />} />
          {/* Reflect */}
          <Route path='/reflect' element={<Reflect />} />
          <Route path='/reflect/record' element={<Record />} />
          <Route path='/reflect/legacy' element={<Legacy />} />
          <Route path='/reflect/daily' element={<Daily />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}


export default App;
