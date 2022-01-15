import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserPage = ({ user }) => {
    const history = useHistory();
    const handleSetAllUsers = () => {
        history.push("/users");
    };
    return (
        <>
            {user
                ? <div className="card-body">
                    <h1 className="card-title">{user.name}</h1>
                    <br />
                    <h3 className="card-text">Профессия: {user.profession.name}</h3>
                    {user.qualities.map((item) => (
                        <span
                            key={item.name}
                            className={"badge m-1 " + "bg-" + item.color}
                        >
                            {item.name}
                        </span>
                    ))}
                    <h5 className="card-text"> completedMeetings: {user.completedMeetings}</h5>
                    <h2 className="card-text">Rate: {user.rate}</h2>
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => handleSetAllUsers()}
                    >
                        Все пользователи
                    </button>
                </div>
                : <h2>{user} not found</h2>
            }
        </>
    );
};
UserPage.propTypes = {
    user: PropTypes.object
};

export default UserPage;
