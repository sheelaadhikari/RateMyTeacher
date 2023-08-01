import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./Rating.css";
import axios from "axios";

const RateBox = (props) => {
    const v = props.value;
    const c = props.category;
    const t = props.teacher;

    const [hover, setHover] = useState(null);
    const [value, setValue] = useState(null);

    const payload = {
        teacher: t,
        category: c,
        value: value,
    };

    const handleClick = async (e) => {
        e.preventDefault();
        console.log("payload is ", payload);

        try {
            const res = await axios.post("/api/v1/rate/rate-teacher", payload);
            console.log("the datas are", res.data);
        } catch (error) {
            console.log("error");
        }
    };

    return (
        <div className="star-box">
            <div className="star-box1 ">
                {[1, 2, 3, 4, 5].map((star, index) => {
                    const ratingValue = index + 1;
                    console.log("star", star);

                    return (
                        <label>
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={handleClick}
                            />

                            <FaStar
                                className="star"
                                color={ratingValue <= (hover || value) ? "#ff0000" : "#e4e5e9"}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                                onClick={() => setValue(star)}
                            />
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default RateBox;
