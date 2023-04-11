import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Pagenotfound from './pages/Pagenotfound';
import Teachers from './pages/Teachers';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
