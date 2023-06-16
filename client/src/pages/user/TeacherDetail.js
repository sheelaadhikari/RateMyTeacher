import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserMenu from "../../components/Layout/UserMenu";

const TeacherDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSingleTeacherDetail();
    console.log("hi");
  }, []);

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
                <h1> Teacher Details</h1>
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/teacher/teacher-photo/${teacher?._id}`}
                    className="card-img-top"
                    alt={teacher?.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{teacher?.name}</h5>
                    <p className="card-text"> {teacher?.subject}</p>
                    <p className="card-text"> {teacher?.bio}</p>
                    <p className="card-text"> {teacher?.rating}</p>
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
