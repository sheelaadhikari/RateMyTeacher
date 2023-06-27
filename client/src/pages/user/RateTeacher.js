import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserMenu from "../../components/Layout/UserMenu";
import './User.css';
import RateBox from "./components/RateBox";
// teacher details
const TeacherDetail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSingleTeacherDetail();

    }, []);




    // for teacher detail
    const getSingleTeacherDetail = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/teacher/get-teacher/${params.slug}`
            );
            console.log(data);
            setTeacher(data.teacher);
        } catch (error) {
            console.log(error);
        } finally {
            console.log("running from finally");
            setLoading(false);
        }
    };
    // for teacher rating

    return (
        <Layout>
            <div>
                {loading && !teacher ? (
                    <div>loading</div>
                ) : (
                    <div className="container-fluid m-3 p-3">
                        <div className="row">
                            <div className="col-md-3">
                                <UserMenu />
                            </div>

                            <div className="col-md-9">
                                <h1> Rate Teacher </h1>


                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img
                                        src={`/api/v1/teacher/teacher-photo/${teacher?._id}`}
                                        className="card-img-top small-img"
                                        alt={teacher?.name}
                                    />

                                    <div className="card-body">

                                        <h5 className="card-title">{teacher?.name}</h5>


                                    </div>
                                    <div>How Do you like the Punctuality of this teacher?
                                        <RateBox />

                                    </div>
                                    <div>How Do you like the Strictness of this teacher?
                                        <RateBox />

                                    </div>
                                    <div>How Do you like the Appearance of this teacher?
                                        <RateBox />

                                    </div>
                                    <div>How Do you like the Teaching Style of this teacher?
                                        <RateBox />

                                    </div>
                                    <div>How Do you like the Interactivity of this teacher?
                                        <RateBox />

                                    </div>
                                    <div>How Do you like the Assignment of this teacher?
                                        <RateBox />

                                    </div>
                                    <div>How Do you like the Funnyness of this teacher?
                                        <RateBox />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}{" "}
            </div>
        </Layout>
    );
};

export default TeacherDetail;
