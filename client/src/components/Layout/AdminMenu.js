import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group">
                    <h4> Admin Panel</h4>

                    <NavLink to="create-products" className="list-group-item list-group-item-action">
                        Create Products
                    </NavLink>
                    <NavLink to="create-category" className="list-group-item list-group-item-action">
                        Create Category
                    </NavLink>
                    <NavLink to="users" className="list-group-item list-group-item-action">
                        Users
                    </NavLink>

                </div>
            </div>
        </>
    );
};

export default AdminMenu;
