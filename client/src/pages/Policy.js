import React from 'react'
import Layout from './../components/Layout/Layout';
import { BiSupport, BiMailSend, BiPhoneCall } from 'react-icons/bi';

const Policy = () => {
    return (
        <Layout>
            <div className='row contactus'>
                <div className='col-md-6'>
                    <img src='/images/contactus.jpg'
                        alt='contactus'
                        style={{ width: "100%" }}
                    />
                </div>
                <div className='col-md-4'>
                    <h1 className='bg-dark p-4 text-white text-center mt-5'>PrivacyPolicy</h1>
                    <p className='text-justify mt-2'>
                        If you have any query feel free to contact us. we are available 24/7.
                    </p>
                    <p className='mt-3'>
                        <BiMailSend />: www.ratemyteacher@gmail.com
                    </p>
                    <p className='mt-3'>
                        <BiPhoneCall />: 977+ 9876543210
                    </p>
                    <p className='mt-3'>
                        <BiSupport />: 1660-01-xxxxxx (tollfree no)
                    </p>





                </div>





            </div>

        </Layout>
    )
}

export default Policy;