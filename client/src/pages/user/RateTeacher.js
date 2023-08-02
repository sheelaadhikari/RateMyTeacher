import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserMenu from "../../components/Layout/UserMenu";
import "./User.css";
import RateBox from "./components/RateBox";

const categoryArray = [
    "punctuality",
    "teachingStyle",
    "funnyness",
    "interactivity",
    "assignment",
    "appearance",
    "strictness",
];

// teacher details
const TeacherDetail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [myRatings, setMyRatings] = useState(null);


    useEffect(() => {
        getSingleTeacherDetail();
    }, []);
    useEffect(() => {
        if (teacher?._id) {
            getMyTeacherRatings();
        }
    }, [teacher]);

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

    // for   getting my teacher rating
    const getMyTeacherRatings = async () => {
        try {
            const res = await axios.get(
                `/api/v1/rate/teacher/${teacher?._id}/my-ratings`
            );
            setMyRatings(res.data.ratings);
        } catch (error) {
            console.log(error);
        }
    };

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

                                    <div>
                                        {myRatings
                                            ? categoryArray.map((category, index) => {
                                                const ratingIndex = myRatings.findIndex(
                                                    (rating, ri) => {
                                                        return rating.category === category;
                                                    }
                                                );
                                                const myRating = myRatings.find((r, i) => r.category === category);
                                                console.log("rating index ", category, ratingIndex);
                                                return (
                                                    <div key={category}>
                                                        {`How Do you like the ${category} of this teacher?`}
                                                        <RateBox
                                                            value={
                                                                myRating ? myRating.value : 0
                                                            }
                                                            category={category}
                                                            teacher={teacher?._id}
                                                            getMyTeacherRatings={getMyTeacherRatings}

                                                        />
                                                    </div>
                                                );
                                            })
                                            : null}
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
