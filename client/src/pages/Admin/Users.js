import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { Toast, toast } from "react-toastify";
import { GiInterleavedArrows } from "react-icons/gi";
import { Link } from "react-router-dom";



const Users = () => {
    const [users, setUsers] = useState([]);
    const getAllUsers = async (req, res) => {
        try {
            const { data } = await axios.get("/api/v1/user/get-users");
            setUsers(data.users);
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllUsers();
    }, []);
    // delete user
    const handleDelete = async () => {
        try {


            let answer = window.prompt("are you sure to delete the user");
            if (!answer) return;
            console.log("delete the user")
            const data = await axios.delete(
                `/api/v1/user/delete-user/${id}`
            );
            toast.success("user deleted  successfully");

        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9 ">
                    <h1 className="text-center">All User List</h1>
                    <div className="flex">
                        {users?.map((u) => (
                            <Link
                                key={u._id}
                                to=
                                {`/admin/dashboard/user/${u.slug}`}

                            >
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Name:{u.name}</h5>
                                        <h5 className="card-title">Email:{u.email}</h5>
                                        <p className="card-text">Fav Sport:{u.answer}</p>
                                        <button className="btn btn-danger" onClick={handleDelete}>
                                            {" "}
                                            Delete User
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
export default Users;