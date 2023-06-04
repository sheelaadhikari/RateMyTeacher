import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { Toast, toast } from "react-toastify";
import { GiInterleavedArrows } from "react-icons/gi";

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);

    //get all teachers
    const getAllTeachers = async (req, res) => {
        try {
            const { data } = await axios.get("/api/v1/teacher/get-teacher");
            setTeachers(data.teachers);
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllTeachers();

    }, []);

    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9 ">
                    <h1 className="text-center">All Teachers List</h1>
                    <div className="d-flex">
                        {teachers?.map(t => (

                            <div className="card m-2" style={{ width: '18rem' }} key={t._id}>
                                <img src={t.photo} className="card-img-top" alt={t.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{t.name}</h5>
                                    <p className="card-text"> {t.bio}</p>
                                </div>
                            </div>

                        ))}
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default Teachers;
