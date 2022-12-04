import { React } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
//Main Page
import Home from './pages/main/Home';

//Recon
import Dashboard from './pages/recon/Dashboard';

const firebaseConfig = {
  apiKey:            process.env.apiKey,
  authDomain:        process.env.authDomain,
  projectId:         process.env.projectId,
  storageBucket:     process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId:             process.env.appId,
  measurementId:     process.env.measurementId
}

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
