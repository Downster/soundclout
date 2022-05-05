import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchContainer = ({ getItems, setIsActive }) => {
    return (
        <>
            {getItems.map((item) => {
                if (item.username) {
                    return (
                        <div className="toDoSearchLink">
                            <i className="fas fa-search"></i>
                            <Link className="search-link"
                                to={`/users/${item.id}`}
                                onClick={() => setIsActive(false)}
                            >{item.username}</Link>
                        </div>
                    )
                } else {
                    return (
                        <div className="toDoSearchLink">
                            <i className="fas fa-search"></i>
                            <Link className="search-link"
                                to={`/songs/${item.id}`}
                                onClick={() => setIsActive(false)}
                            >{item.title}</Link>
                        </div>
                    )
                }
            })}
        </>
    );
};

export default SearchContainer;