import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateTeacher = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [subject, setSubject] = useState("");
    const [photo, setPhoto] = useState("");

    // create teacher function
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const teacherData = new FormData();
            teacherData.append("name", name);
            teacherData.append("bio", bio);
            teacherData.append("subject", subject);

            teacherData.append("photo", photo);
            const { data } = axios.post(
                "/api/v1/teacher/create-teacher",
                teacherData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("teacher created successfully");
                navigate("/dashboard/admin/teachers");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

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
                            <label className="btn btn-outline-secondary col-md-12">
                                {photo ? photo.name : "Upload Photo"}
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    hidden
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            {photo && (
                                <div className="text-center">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="teacher_photo"
                                        height={"200px"}
                                        className="img img-responsive"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                value={name}
                                placeholder="write a name"
                                className="form-control"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                value={subject}
                                placeholder="write a subject name"
                                className="form-control"
                                onChange={(e) => {
                                    setSubject(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                value={bio}
                                placeholder="write teacher bio"
                                className="form-control"
                                onChange={(e) => {
                                    setBio(e.target.value);
                                }}
                            />
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}> create teacher</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateTeacher;
