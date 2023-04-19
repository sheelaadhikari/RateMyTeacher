import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';



const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();



    //  form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login',
                { email, password });
            console.log(res.data)
            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                navigate("/");

            }
            else {
                toast.error(res.data.message);
            }

        }

        catch (error) {
            console.log(error);
            toast.error("something went wrong");

        }
    };



    return (
        <Layout title="Login - RateMyTeacher">
            <div className='form-container'>

                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Login Page</h4>


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