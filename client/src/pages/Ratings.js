import axios from "axios";
import { useAuth } from "../context/auth";
import "../../src/index.css";
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";

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
        <div className="list-of-AllTeachersRatings">
          {loading ? "loading" : "List Of All TeachersRatings"}
        </div>
        <div className="container-box">
          {ratings?.map((r) => (
            <div className="h-ratings">
              <div>
                <p className="card-title">{r.overallRating}</p>
                <p className="card-text"> {r.teacher[0].name}</p>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Ratings;
