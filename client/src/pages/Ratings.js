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
      <Layout>
        <div className="list-of-teachers">
          {loading ? "loading" : "Ratings Of Teachers"}
        </div>
        <div className="d-flex flex-wrap">
          {ratings
            ?.sort((a, b) => b.overallRating - a.overallRating) // Sort ratings in descending order
            .map((r) => (
              <div className="" key={r}>
                <div
                  style={{ fontWeight: "bold", color: "black" }}
                  className="t-link"
                >
                  <img
                    src={`/api/v1/teacher/teacher-photo/${r._id}`}
                    className="mb-3"
                  ></img>
                  <div className="d-flex justify-content-center pt-2 gap-2">
                    <RatingDisplayBox rating={r.overallRating} />
                    <span style={{ paddingTop: "2px" }}>
                      {" "}
                      {r?.overallRating?.toFixed(1)}
                    </span>
                  </div>
                  <hr></hr>
                  <div className=" text-center mb-2">
                    {r.teacher[0].name} [{r.teacher[0].subject}]
                  </div>
                  <div className="text-center">{r.teacher[0].bio}</div>
                </div>
              </div>
            ))}
        </div>
      </Layout>
    </div>
  );
};

export default Ratings;
