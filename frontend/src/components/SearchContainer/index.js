import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchContainer = ({ getItems }) => {
    return (
        <ul>
            {getItems.map((item) => (
                <div className="toDoSearchLink">
                    <Link to={`/${item?.id}`}>{item?.content}</Link>
                </div>
            ))}
        </ul>
    );
};

export default SearchContainer;