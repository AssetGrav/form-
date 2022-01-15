import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QuestionList from "./qualitiesList";
import Table from "./table";
import { Link } from "react-router-dom";

const UsersTable = ({ users, onSort, selectedSort, onChangeBookmark, onDelete, onSelectUser }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <>
                    <Link to={"/users/" + user._id} onClick={() => onSelectUser(user)}>{user.name}</Link>
                </>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => (
                <QuestionList qualities={user.qualities} />
            )
        },
        professions: { path: "profession.name", name: "Профессии" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => onChangeBookmark(user._id)}
                />
            )
        },
        delate: {
            component: (user) => (<button
                onClick={() => onDelete(user._id)}
                className="btn btn-danger"
            >
                delete
            </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onChangeBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelectUser: PropTypes.func
};

export default UsersTable;
