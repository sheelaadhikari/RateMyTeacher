import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Register from './pages/Register';
import Pagenotfound from './pages/Pagenotfound';
import Teachers from './pages/Teachers';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Policy from './pages/Policy';


function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path='/teachers' element={<Teachers />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />


        <Route path='*' element={<Pagenotfound />} />



      </Routes>

    </>

  );
}

export default App;
