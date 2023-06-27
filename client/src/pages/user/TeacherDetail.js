import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserMenu from "../../components/Layout/UserMenu";
import RatingDisplayBox from "./components/RatingDisplayBox";
// teacher details
const TeacherDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teacherRating, setTeacherRating] = useState(null);


  useEffect(() => {
    getSingleTeacherDetail();

  }, []);


  useEffect(() => {
    if (teacher?._id) {
      getSingleTeacherRating();
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
  // for teacher rating
  const getSingleTeacherRating = async () => {
    try {
      const res = await axios.get(
        `/api/v1/rate/teacher/${teacher?._id}/ratings`
      );
      setTeacherRating(res.data.ratings);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("all data", teacherRating?.punctualityAverage);
  console.log("overall value is", teacherRating?.overall);
  console.log("teaching value is", teacherRating?.teachingStyleAverae);

  return (
    <Layout>
      <div>
        {loading && !teacher && !teacherRating ? (
          <div>loading</div>
        ) : (
          <div className="container-fluid m-3 p-3">
            <div className="row">
              <div className="col-md-3">
                <UserMenu />
              </div>

              <div className="col-md-9">
                <h1> Teacher Details</h1>


                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/teacher/teacher-photo/${teacher?._id}`}
                    className="card-img-top"
                    alt={teacher?.name}
                  />
                  <div>
                    <Link to={`/teacher/${teacher?.slug}/rate`}>
                      Rate Teacher
                    </Link>
                  </div>
                  <div className="card-body">
                    <div className="card-text">
                      <RatingDisplayBox rating={teacherRating?.overall} />
                    </div>
                    <h5 className="card-title">{teacher?.name}</h5>
                    <p className="card-text"> {teacher?.subject}</p>
                    <p className="card-text"> {teacher?.bio}</p>
                    <div className="card-text">
                      <div>
                        Teaching Style:{" "}
                        <RatingDisplayBox
                          rating={teacherRating?.teachingStyleAverae}
                        />
                      </div>
                      <div>
                        Punctuality
                        <RatingDisplayBox rating={teacherRating?.punctualityAverage} />
                      </div>
                      <div>
                        Funnyness
                        <RatingDisplayBox rating={teacherRating?.funnynessAverage} />
                      </div>
                      <div>
                        Strictness
                        <RatingDisplayBox rating={teacherRating?.strictnessAverage} />
                      </div>
                      <div>
                        Appearance
                        <RatingDisplayBox rating={teacherRating?.appearanceAverage} />
                      </div>
                      <div>
                        Assignment
                        <RatingDisplayBox rating={teacherRating?.assignmentAverage} />
                      </div>
                      <div>
                        Ineteractivity
                        <RatingDisplayBox
                          rating={teacherRating?.interactivityAverage}
                        />
                      </div>
                    </div>
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
