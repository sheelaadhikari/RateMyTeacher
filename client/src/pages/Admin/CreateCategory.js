import React from 'react'
import AdminMenu from './../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';


const CreateCategory = () => {
    return (
        <Layout>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1> CreateCategory</h1>
                </div>
            </div>

        </Layout>
    )
}

export default CreateCategory