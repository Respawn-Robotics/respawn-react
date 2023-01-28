import { React } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import paths from './paths.json';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

// Authentication
import SignIn from './pages/authentication/signin/SignIn';
import SignOut from './pages/authentication/signout/SignOut';

// Main Page
import Home from './pages/main/home/Home';
import Sponsors from './pages/main/sponsors/Sponsors';
import About from './pages/main/about/About';
import First from './pages/main/first/First';
import Outreach from './pages/main/outreach/Outreach';

// Recon
import Dashboard from './pages/recon/dashboard/Dashboard';
import Scout from './pages/recon/scout/Scout';
import MasterTable from './pages/recon/master-table/MasterTable';
import Profile from './pages/recon/profile/Profile';
import CreateJoinTeam from './pages/recon/teams/create-join-team/CreateJoinTeam';
import Teams from './pages/recon/teams/Teams';
import TeamMatches from './pages/recon/teams/team-matches/TeamMatches';
import Matches from './pages/matches/Matches';

// Reflect
import Reflect from './pages/reflect/home/Reflect'
import Record from './pages/reflect/record/Record'
import Legacy from './pages/reflect/legacy/Legacy'
import Daily from './pages/reflect/daily/Daily'
import DailyEntry from './pages/reflect/daily/dailyEntry/DailyEntry';
import DailyEntryForm from './pages/reflect/daily/dailyEntryForm/DailyEntryForm';
import ManageTeam from './pages/recon/teams/manage-team/ManageTeam';

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path={paths.authentication['signin']} element={<SignIn />} />
        <Route path={paths.authentication['signout']} element={<SignOut />} />
        {/* Main Page */}
        <Route path={paths.main['home']} element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path={paths.main['sponsors']} element={<Sponsors />} />
          <Route path={paths.main['about']} element={<About />} />
          <Route path={paths.main['first']} element={<First />} />
          <Route path={paths.main.pillars['reach']} element={<Outreach />} />
        </Route>
        {/* Recon */}
        <Route path={paths.recon['dashboard']} element={<Navbar type='recon' />}>
          <Route index element={<Dashboard />} />
          <Route path={paths.recon['scout']} element={<Scout />} />
          <Route path={paths.recon['master-table']} element={<MasterTable />} />
          <Route path={paths.recon['profile']} element={<Profile />} />
          <Route path={paths.recon['create-join-team']} element={<CreateJoinTeam />} />
          <Route path={paths.recon['teams']} element={<Teams />} />
          <Route path={paths.recon['team-stats']} element={<TeamMatches />} />
          <Route path={paths.recon['matches']} element={<Matches />} />
          <Route path={paths.recon['manage-team']} element={<ManageTeam />} />
        </Route>
        {/* Reflect */}
        <Route path={paths.reflect['home']} element={<Navbar type='reflect' />}>
          <Route index element={<Reflect />} />
          <Route path={paths.reflect['record']} element={<Record />} />
          <Route path={paths.reflect['legacy']} element={<Legacy />} />
          <Route path={paths.reflect['daily']} element={<Daily />} />
          <Route path={paths.reflect['daily-entry']} element={<DailyEntry />} />
          <Route path={paths.reflect['daily-entry-form']} element={<DailyEntryForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Footer />
  </>;
}


export default App;
