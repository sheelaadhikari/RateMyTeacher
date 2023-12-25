import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4> Admin Panel</h4>

          <NavLink
            to="/admin/create-teacher"
            className="list-group-item list-group-item-action"
          >
            Create Teacher
          </NavLink>

          <NavLink
            to="/teachers"
            className="list-group-item list-group-item-action"
          >
            Teachers
          </NavLink>

          <NavLink
            to="/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
