import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();



    //  form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register',
                { name, email, phone, address, password, answer });
            console.log(res.data)
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
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
        <Layout title="Register - RateMyTeacher">
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Register Page</h4>
                    <div className="mb-3">
                        <input type="text"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder=' Enter your Name' required />
                    </div>

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

                    <div className="mb-3">
                        <input type="number"
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}

                            className="form-control" id="exampleInputPhone" aria-describedby="emailHelp" placeholder='Enter Your Phone' />
                    </div>

                    <div className="mb-3">
                        <input type="text"
                            value={address}
                            onChange={(e) => { setAddress(e.target.value) }}

                            className="form-control" id="exampleInputAddress" aria-describedby="emailHelp" placeholder='Enter Your Address' />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                            value={answer}
                            onChange={(e) => { setAnswer(e.target.value) }}

                            className="form-control" id="exampleInputAddress" aria-describedby="emailHelp" placeholder='what is your fav sport?' />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    );
};

export default Register;