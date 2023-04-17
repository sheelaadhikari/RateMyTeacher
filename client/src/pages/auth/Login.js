import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';


const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    //  form function
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password,);
        toast.success("login successful");
    };



    return (
        <Layout title="Login - RateMyTeacher">
            <div className='register'>
                <h1>Login Page</h1>
                <form onSubmit={handleSubmit}>


                    <div className="mb-3">
                        <input type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder=' Enter Your Email' required />
                    </div>


                    <div className="mb-3">
                        <input type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            className="form-control" id="exampleInputPassword" placeholder='Enter Your Password' required />
                    </div>




                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    );
};


export default Login