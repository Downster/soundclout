import React, { useState, useRef, useEffect } from "react";
import { useDetectOutsideClick } from "../DetectClick"
import SearchContainer from "../SearchContainer"
import { csrfFetch } from "../../store/csrf";
import './dynamicSearch.css'

const DynamicSearch = ({ className, placeHolder }) => {
    const dropdownRef = useRef(null);
    const [myOptions, setMyOptions] = useState({
        users: new Set(),
        songs: new Set(),
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
                if (!myOptions.users.length || !myOptions.songs.length) {
                    for (let i = 0; i < data.users.length; i++) {
                        myOptions.users.add(JSON.stringify(data.users[i]));
                    }
                    for (let i = 0; i < data.songs.length; i++) {
                        myOptions.songs.add(JSON.stringify(data.songs[i]));
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
                    myOptions.users.add(JSON.stringify(data.users[i]));
                }
                for (let i = 0; i < data.songs.length; i++) {
                    myOptions.songs.add(JSON.stringify(data.songs[i]));
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
        if (myOptions.users !== undefined && myOptions.songs !== undefined) {
            const usersArray = []
            const songsArray = []
            myOptions.users.forEach((user) => {
                const parsedUser = JSON.parse(user)
                usersArray.push(parsedUser)
            })

            myOptions.songs.forEach((song) => {
                const parsedSong = JSON.parse(song)
                songsArray.push(parsedSong)
            })
            const filteredUsers = usersArray.filter((user) => {
                return user.username.toLowerCase().includes(myOptions.searchTerm.toLowerCase())
            }
            );
            const filteredSongs = songsArray.filter((song) => {
                return song.title.toLowerCase().includes(myOptions.searchTerm.toLowerCase())
            }
            );
            return (filteredUsers.concat(filteredSongs))

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
                <SearchContainer getItems={dynamicSearch()} setIsActive={setIsActive} />
            </div>
        </>
    );
};

export default DynamicSearch;
