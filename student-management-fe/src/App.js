import './App.css';
import MyNavbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Management from './pages/Management';
import About from './pages/About';

function App() {
  return (
    <Router>
      <MyNavbar />
      <div className='bg-body-tertiary min-vh-100'>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/management" element={<Management />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
