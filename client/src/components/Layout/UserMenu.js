import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group">
                    <h4> Dashboard</h4>

                    {/* <NavLink to="" className="list-group-item list-group-item-action">
                        Profile
                    </NavLink> */}
                    <NavLink to="/" className="list-group-item list-group-item-action">
                        Teachers
                    </NavLink>


                </div>
            </div>
        </>
    )
}

export default UserMenu