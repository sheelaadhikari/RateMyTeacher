import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { Toast, toast } from "react-toastify";
import { GiInterleavedArrows } from "react-icons/gi";
import { Link } from "react-router-dom";

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
          <div className="flex flex-wrap ">
            {teachers?.map((t) => (
              <Link
                key={t._id}
                to={`/dashboard/admin/teacher/${t.slug}`}
                className=""
              >
                <div className="card m-2 " style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/teacher/teacher-photo/${t._id}`}
                    className="card-img-top teacher-photo"
                    alt={t.name}
                  />
                  <div className="card-body ">
                    <h5 className="card-title">{t.name}</h5>
                    <hr></hr>
                    <p className="card-text"> {t.subject}</p>
                    <p className="card-text"> {t.bio}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Teachers;
