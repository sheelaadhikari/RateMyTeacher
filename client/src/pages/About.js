import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
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
                    <h1 className='bg-dark p-4 text-white text-center mt-5 '>About Us</h1>
                    <p className='text-justify mt-2'>
                        RateMyProfessors.com (RMP) is a review site, founded in May 1999 by John Swapceinski,
                        a software engineer from Menlo Park, California, which allows anyone to assign ratings to
                    </p>






                </div>





            </div>

        </Layout>
    )
}

export default About;