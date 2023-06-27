import React from "react";
import { FaStar } from "react-icons/fa";
import './Rating.css';

const RateBox = (props) => {

    return (
        <div className="star-box">
            <div className="star-box1">
                {[1, 2, 3, 4, 5].map((star, index) => {
                    return (
                        <label key={star} style={{ color: "#cccccc" }} >

                            <div > <FaStar /></div>
                        </label >
                    );
                })}
            </div>



        </div >
    );
};

export default RateBox;
