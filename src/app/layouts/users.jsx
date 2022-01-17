import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginates";
import Pagination from "../components/pagination";
import SearchStatus from "../components/searchStatus";
import api from "../api";
import GroupList from "../components/groupList";
import UsersTable from "../components/usersTable";
import _ from "lodash";
import UserPage from "../components/userPage";
const Users = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 4;
    const [users, setUsers] = useState();
    const [user, setUser] = useState();
    const userId = match.params.userId;
    useEffect(() => {
        if (userId) {
            api.users.getById(userId).then((item) => setUser(item));
        } else {
            api.users.fetchAll().then((item) => setUsers(item));
        }
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookmark = (id) => {
        const newUsers = users.map((user) => {
            if (user._id === id) {
                user.bookmark === false
                    ? (user.bookmark = true)
                    : (user.bookmark = false);
            };
            return user;
        });
        setUsers(newUsers);
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionsSelect = (item) => {
        setSelectedProf(item);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const deepEqual = (obj1, obj2) => {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    };
    const handleSelectUser = (itemUser) => {
        setUser(itemUser);
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => deepEqual(user.profession, selectedProf))
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };
        return (
            <>
                {userId
                    ? <UserPage user={user} />
                    : <div className="d-flex">
                        {professions && (
                            <div className="d-flex flex-column flex-shrink-0 p-3">
                                <GroupList
                                    selectedItem={selectedProf}
                                    items={professions}
                                    onItemSelect={handleProfessionsSelect}
                                />
                                <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                                    Очистить
                                </button>
                            </div>
                        )}
                        <div className="d-flex flex-column">
                            {SearchStatus(count)}
                            {count > 0 &&
                            <>
                                <UsersTable
                                    users={usersCrop}
                                    selectedSort={sortBy}
                                    onSort={handleSort}
                                    onDelete={handleDelete}
                                    onChangeBookmark={handleToggleBookmark}
                                    onSelectUser={handleSelectUser}
                                    userId={userId}
                                />
                            </>
                            }
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    itemsCount={count}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }
    return "loading...";
};
Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    rest: PropTypes.func,
    match: PropTypes.object
};

export default Users;
