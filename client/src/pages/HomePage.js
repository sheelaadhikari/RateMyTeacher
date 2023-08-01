import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [auth, setAuth] = useAuth();
    const [teachers, setTeachers] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllTeachers();
        console.log("hello");
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
            <div>{loading ? "loading" : "home Page"}</div>

            {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}

            <div className="d-flex">
                {teachers?.map((t) => (
                    <Link
                        key={t._id}
                        to={isUser ? `/teacher/${t.slug}` : `/admin/teacher/${t.slug}`}
                        className="teacher-link"
                    >
                        <div
                            className="card m-2"
                            style={{ width: "18rem" }}
                            onClick={() => {
                                console.log(t.slug);
                                console.log(t._id);
                            }}
                        >
                            <img
                                src={`/api/v1/teacher/teacher-photo/${t._id}`}
                                className="card-img-top"
                                alt={t.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{t.name}</h5>
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
