import React from 'react'
import Layout from './../components/Layout/Layout';
import { Link } from 'react-router-dom';

const Pagenotfound = () => {
    return (
        <Layout>
            <div className='pnf'>
                <h1 className='pnf-title'>404</h1>
                <h2 className='pnf-heading'>Oops! page not found</h2>
                <Link t0='/' className='pnf-btn'>Go Back</Link>
            </div>
        </Layout>
    );
};

export default Pagenotfound;