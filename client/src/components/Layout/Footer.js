import React from 'react';
import { Link } from 'react-router-dom';
import About from './../../pages/About';
import Teachers from './../../pages/Teachers';

const Footer = () => {
    return (
        <div className='footer' >
            <h4 className='text-center'> All Right Reserved &copy; RateMyTeacher</h4>
            <p className="text-center mt-3" >
                <Link to='/about'>About</Link>|
                <Link to='/policy'>PrivacyPolicy</Link>|
                <Link to='/contact'>Contact</Link>|

            </p>

        </div>
    );
};

export default Footer