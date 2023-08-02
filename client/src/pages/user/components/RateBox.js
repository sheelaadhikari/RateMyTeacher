import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./Rating.css";
import axios from "axios";

const RateBox = (props) => {
    const v = props.value;
    const c = props.category;
    const t = props.teacher;
    const myRatings = props.myRatings;
    const getMyTeacherRatings = props.getMyTeacherRatings;


    const [hover, setHover] = useState(null);
    const [value, setValue] = useState(null);

    const payload = {
        teacher: t,
        category: c,
        value: value,
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/api/v1/rate/rate-teacher", payload);
            // to recall my ratings api
            getMyTeacherRatings();
            console.log("the datas are", res.data);
        } catch (error) {
            console.log("error");
        }
    };

    return (
        <div className="star-box">
            <div className="star-box1 ">
                {[1, 2, 3, 4, 5].map((star, index) => {

                    let colored = false;
                    if (hover) {
                        colored = star <= hover;
                    } else {
                        colored = star <= v
                    }

                    return (
                        <label>
                            <input
                                type="radio"
                                name="rating"
                                value={star}
                                onClick={handleClick}
                            />

                            <FaStar
                                className="star"
                                color={colored ? "#ff0000" : "#e4e5e9"}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(null)}
                                onClick={() => setValue(star)


                                }
                            />
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default RateBox;
