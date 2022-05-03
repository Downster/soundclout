import React, { useState, useRef, useEffect } from "react";
import { useDetectOutsideClick } from "../DetectClick"
import SearchContainer from "../SearchContainer"
import { csrfFetch } from "../../store/csrf";

const DynamicSearch = ({ className, placeHolder }) => {
    const dropdownRef = useRef(null);
    const [myOptions, setMyOptions] = useState({
        items: new Set(),
        searchTerm: "",
    });
    const [value, setValue] = useState("");
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    useEffect(() => {
        csrfFetch("/api/search")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data)
                if (!myOptions.items.length) {
                    for (let i = 0; i < data.users.length; i++) {
                        myOptions.items.add(data.users[i].username);
                    }
                    for (let i = 0; i < data.songs.length; i++) {
                        myOptions.items.add(data.songs[i].title);
                    }
                    setMyOptions(myOptions);
                } else {
                    getDataFromAPI();
                }
            });
    }, []);

    const getDataFromAPI = () => {
        csrfFetch("/api/search")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                for (let i = 0; i < data.users.length; i++) {
                    myOptions.items.add(data.users[i].username);
                }
                for (let i = 0; i < data.songs.length; i++) {
                    myOptions.items.add(data.songs[i].title);
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
        if (myOptions.items !== undefined) {
            const itemsArray = [...myOptions.items]
            const filtered = itemsArray.filter((item) =>
                item.toLowerCase().includes(myOptions.searchTerm.toLowerCase())
            );
            console.log(filtered)
            return filtered
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
