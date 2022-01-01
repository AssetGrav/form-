import React from "react";
import Qualities from "./qualities";
import Bookmark from "./bookmark";

const User = (user, rest) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((item) => (
                    <Qualities key={item._id} {...item} />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate} </td>
            <td>{<Bookmark {...user} />}</td>
            <td>{user.button}</td>
        </tr>
    );
};
export default User;
