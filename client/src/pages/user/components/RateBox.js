import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./Rating.css";

const RateBox = () => {

    const [rating, setRating] = useState(null);

    const [hover, setHover] = useState(null);



    return (
        <div className="star-box">
            <div className="star-box1 ">
                {[1, 2, 3, 4, 5].map((star, index) => {
                    const ratingValue = index + 1;




                    return (
                        <label>
                            <input type="radio" name="rating" value={ratingValue} onClick={() => {

                                console.log("star", star);


                                setRating(ratingValue);

                            }
                            }

                            />


                            <FaStar className="star" color={ratingValue <= (hover || rating) ? "#ff0000" : "#e4e5e9"}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}

                            />

                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default RateBox;
