import './App.css';
import Downloader from './components/Downloader';
import EyeTracker from './components/EyeTracker';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Empresa from './components/Empresa';
import Contato from './components/Contato';
import videoBg from './assets/videoBg.mp4'
import Video from './components/Video';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' exact='true' element={<Home/>}></Route>
            <Route path='/eyeTracker' element={<EyeTracker/>}></Route>
          </Routes>
        </Router>

      </header>
    </div>
  );
}

export default App;