import axios from "axios";
import { useAuth } from "../context/auth";
import "../../src/index.css";
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import RatingDisplayBox from "./user/components/RatingDisplayBox";

const Ratings = () => {
  const [auth, setAuth] = useAuth();

  const [ratings, setRatings] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllTeachersRatings();
  }, []);

  const loadAllTeachersRatings = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/v1/rate/teacher/all-ratings");
      setRatings(res.data.ratings);
      console.log(ratings);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("running from finally");
      setLoading(false);
    }
  };
  const isUser = auth?.user?.role === 0;

  return (
    <div>
      Ratings
      <Layout>
        <div className="list-of-teachers">
          {loading ? "loading" : "List Of All TeachersRatings"}
        </div>
        <div className="container-box">
          {ratings
            ?.sort((a, b) => b.overallRating - a.overallRating) // Sort ratings in descending order
            .map((r) => (
              <div className="h-ratings" key={r}>
                <div style={{ fontWeight: "bold", color: "black" }}>
                  <img src={`/api/v1/teacher/teacher-photo/${r._id}`}></img>
                  <div className="card-text">
                    <RatingDisplayBox rating={r.overallRating} />
                  </div>
                  <p className="card-text">Name : {r.teacher[0].name}</p>
                  <p className="card-text">Subject : {r.teacher[0].subject}</p>
                  <p className="card-text">Bio : {r.teacher[0].bio}</p>
                </div>
              </div>
            ))}
        </div>
      </Layout>
    </div>
  );
};

export default Ratings;
