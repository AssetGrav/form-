import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "./api";
import Users from "./components/users";

function App() {
    const [usersArr, setUsers] = useState();
    useEffect(() => {
        console.log("render");
    });
    api.users.fetchAll().then((item) => console.log(item));
    const handleDelete = (userId) => {
        setUsers(usersArr.filter((user) => user._id !== userId));
    };
    const handleToggleBookmark = (id) => {
        const newUsers = usersArr.map((user) => {
            if (user._id === id) {
                user.bookmark === false
                    ? (user.bookmark = true)
                    : (user.bookmark = false);
            };
            return user;
        });
        setUsers(newUsers);
    };
    return (
        <>
            <Users
                users={usersArr}
                {...usersArr}
                onDelete={handleDelete}
                onChange={handleToggleBookmark}
            />
        </>
    );
};
App.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    rest: PropTypes.func
};

export default App;
