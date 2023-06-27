import React from "react";
import { FaStar } from "react-icons/fa";
import './Rating.css';

const RatingDisplayBox = (props) => {
    const r = props.rating;
    return (
        <div className="star-box">
            <div className="star-box1">
                {[1, 2, 3, 4, 5].map((star, index) => {
                    return (
                        <label key={star} style={{ color: "#cccccc" }} >

                            <FaStar />
                        </label >
                    );
                })}
            </div>
            <div className="star-box2">
                {[1, 2, 3, 4, 5].map((star, index) => {

                    const diff = star - r;
                    let width = 0;
                    if (diff < 0) {
                        width = 16;
                    }
                    if (diff >= 0 && diff <= 1) {
                        width = (1 - diff) * 16;
                    }

                    console.log(width)


                    return (
                        <label key={star} style={{ color: "#008B76", width: `${width}px`, overflow: 'hidden' }} >

                            <FaStar />
                        </label >
                    );
                })}
            </div>

        </div >
    );
};

export default RatingDisplayBox;
