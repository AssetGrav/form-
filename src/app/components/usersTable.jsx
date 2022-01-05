import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QuestionList from "./qualitiesList";
import Table from "./table";

const UsersTable = ({ users, onSort, selectedSort, onChangeBookmark, onDelete }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
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
    onDelete: PropTypes.func.isRequired
};

export default UsersTable;
