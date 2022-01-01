import React from "react";

const Qualities = (item) => {
    return (
        <span className={"badge m-1 bg-" + item.color} key={item._id}>
            {item.name}
        </span>
    );
};

export default Qualities;
