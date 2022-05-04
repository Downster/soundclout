import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchContainer = ({ getItems }) => {
    console.log(getItems)
    return (
        <ul>
            {getItems.map((item) => {
                if (item.username) {
                    return (
                        <li className="toDoSearchLink">
                            <Link className="search-link" to={`/users/${item.id}`}>{item.username}</Link>
                        </li>
                    )
                } else {
                    return (
                        <li className="toDoSearchLink">
                            <Link className="search-link" to={`/songs/${item.id}`}>{item.title}</Link>
                        </li>
                    )
                }
            })}
        </ul>
    );
};

export default SearchContainer;