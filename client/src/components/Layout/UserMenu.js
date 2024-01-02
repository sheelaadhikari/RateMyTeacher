import React from "react";
import { NavLink } from "react-router-dom";
import "../../index.css";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4> Details </h4>

          <NavLink to="" className="list-group-item list-group-item-action">
            Profile
          </NavLink>
          <NavLink
            to="/teachers"
            className="list-group-item list-group-item-action "
            id="see-your-teacher"
          >
            See your Teachers
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
