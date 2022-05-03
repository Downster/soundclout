import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDetectOutsideClick } from "../detectClick/useDetectOutsideClick";
import SearchContainer from "../searchContainer/searchContainer";

const DynamicSearch = ({ className, placeHolder }) => {
    const dropdownRef = useRef(null);
    const [myOptions, setMyOptions] = useState({
        items: [],
        searchTerm: "",
    });
    const [value, setValue] = useState("");
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    useEffect(() => {
        fetch("/api/search")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                if (!myOptions.items.length) {
                    for (let i = 0; i < data.length; i++) {
                        myOptions.items.push(data[i]);
                    }
                    setMyOptions(myOptions);
                } else {
                    getDataFromAPI();
                }
            });
    }, []);

    const getDataFromAPI = () => {
        console.log("Options Fetched from API");

        fetch("/api/search")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                //console.log(data);
                /* figure out a way to compare in 0(n) time???  */
                for (let i = 0; i < data.length; i++) {
                    let shouldPush = true;
                    for (let j = 0; j < data.length; j++) {
                        if (data[j].content === data[i].content) {
                            shouldPush = false;
                            break;
                        }
                    }
                    if (shouldPush) {
                        myOptions.items.push(data[i]);
                    }
                }
                setMyOptions(myOptions);
            });
    };

    const handleSearchChange = (e) => {
        getDataFromAPI();
        setMyOptions((myOptions.searchTerm = e.target.value));
        setValue(e.target.value);
    };

    const dynamicSearch = () => {
        if (myOptions.todos !== undefined) {
            return myOptions.items.filter((todo) =>
                todo.content.toLowerCase().includes(myOptions.searchTerm.toLowerCase())
            );
        } else {
            return [];
        }
    };

    const resetSearch = () => {
        setMyOptions({
            todos: [],
            searchTerm: "",
        });
    };


    return (
        <>
            <input
                className={className}
                type="text"
                onChange={handleSearchChange}
                onClick={setIsActive}
                placeholder={placeHolder}
            ></input>
            <div
                ref={dropdownRef}
                className={`searchMenu ${isActive ? "active" : "inactive"}`}
            >
                <SearchContainer getItems={dynamicSearch()} reset={resetSearch} />
            </div>
        </>
    );
};

export default DynamicSearch;
