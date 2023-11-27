import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../src/index.css';



const HomePage = () => {
    const [auth, setAuth] = useAuth();
    const [teachers, setTeachers] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllTeachers();

    }, []);

    const loadAllTeachers = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/v1/teacher/get-teacher");
            setTeachers(res.data.teachers);
        } catch (error) {
            console.log(error);
        } finally {
            console.log("running from finally");
            setLoading(false);
        }
    };

    const isUser = auth?.user?.role === 0;
    return (
        <Layout>



            <div className="list-of-teachers">{loading ? "loading" : "List Of All Teachers"}</div>

            {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}





            <div className="container-box">
                {teachers?.map((t) => (
                    <Link
                        key={t._id}
                        to={isUser ? `/teacher/${t.slug}` : `/admin/teacher/${t.slug}`}
                        className="teacher-link"
                    >
                        <div
                            className="teacher-box"

                            onClick={() => {
                                console.log(t.slug);
                                console.log(t._id);
                            }}
                        >
                            <img
                                src={`/api/v1/teacher/teacher-photo/${t._id}`}
                                className="teacher-photo"
                                alt={t.name}
                            />
                            <div className="teacher-details">
                                <p className="card-title">{t.name}</p>
                                <p className="card-text"> {t.subject}</p>
                                <p className="card-text"> {t.bio}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </Layout>
    );
};

export default HomePage;
