import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;

const CreateTeacher = () => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [subject, setSubject] = useState("");
    const [rating, setRating] = useState("");
    const [photo, setPhoto] = useState("");



    return (
        <Layout title={"Dashboard - All Create Teacher"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1> CreateTeachers</h1>
                        <div className="mb-3">
                            <label className="btn btn-outline-secondary">
                                {photo ? photo.name : "Upload Photo"}
                                <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden />

                            </label>

                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateTeacher;
