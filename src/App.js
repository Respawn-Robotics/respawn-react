import logo from './logo.svg';
import Navbar from './navbar/Navbar';
import './App.css';

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
  return (
    <div className="App">
      <Navbar />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
