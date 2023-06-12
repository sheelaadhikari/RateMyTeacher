import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateTeacher = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [subject, setSubject] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    //get single teacher
    const getSingleTeacher = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/teacher/get-teacher/${params.slug}`
            );
            setName(data.teacher.name);
            setSubject(data.teacher.subject);
            setBio(data.teacher.bio);
            setPhoto(data.teacher.photo);
            setId(data.teacher._id);

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleTeacher();
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        try {
            const teacherData = new FormData();
            teacherData.append("name", name);
            teacherData.append("bio", bio);
            teacherData.append("subject", subject);
            teacherData.append("id", id);

            photo && teacherData.append("photo", photo);

            const { data } = axios.put(
                `/api/v1/teacher/update-teacher/${id}`,
                teacherData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("teacher updated successfully");
                navigate("/dashboard/admin/teachers");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    // Delete the teacher

    const handleDelete = async () => {
        try {
            let answer = window.prompt("are you sure to delete the teacher");
            if (!answer) return;

            const { data } = await axios.delete(
                `/api/v1/teacher/delete-teacher/${id}`
            );
            toast.success("teacher deleted  successfully");
            navigate("/dashboard/admin/teachers");
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    return (
        <Layout title={"Dashboard - All Update Teacher"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1> UpdateTeachers</h1>
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
                            {photo ? (
                                <div className="text-center">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="teacher_photo"
                                        height={"200px"}
                                        className="img img-responsive"
                                    />
                                </div>
                            ) : (
                                <div className="text-center">
                                    <img
                                        src={`/api/v1/teacher/teacher-photo/${id}`}
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
                                <button className="btn btn-primary" onClick={handleUpdate}>
                                    {" "}
                                    Update Teacher
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-danger" onClick={handleDelete}>
                                    {" "}
                                    Delete Teacher
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default UpdateTeacher;
