import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext, useState, useRef, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import searchUser from "../../../services/searchApi";
import standardProfilePicture from "../../assets/imgs/profile-standard.jpg";
import { Link } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import FollowingContext from "../../../contexts/FollowingContext";

export default function SearchContent({
    layout,
    displayResults,
    setDisplayResults,
}) {
    const { user } = useContext(UserContext);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { followingUsers } = useContext(FollowingContext);
    const node = useRef();

    const handleClick = e => {if (node.current && !node.current.contains(e.target)) setDisplayResults(false)};

    useEffect(() => { document.addEventListener("mousedown", handleClick) }, []);//eslint-disable-line react-hooks/exhaustive-deps

    function getUser(e) {
        if (e.target.value.length >= 3) {
            setSearch(e.target.value);
        }
        setDisplayResults(!!e.target.value);
        if (e.target.value) {
            const request = searchUser(e.target.value, user.token);
            request.then((res) => {
                const orderedResults = res.data.users.sort((a, b) => {
                    if (
                        followingUsers.includes(a.id) &&
                        !followingUsers.includes(b.id)
                    ) {
                        return -1;
                    }
                    if (
                        !followingUsers.includes(a.id) &&
                        followingUsers.includes(b.id)
                    ) {
                        return 1;
                    }
                    return 0;
                });
                setSearchResults(orderedResults);
            });
        }
    }

    function addDefaultProfileImgSrc(ev) {
        ev.target.src = standardProfilePicture;
    }

    function clickedInput(e) {
        if (e.target.value.length >= 3) {
            setDisplayResults(true);
        }
    }

    function clickUser() {
        setDisplayResults(false);
        setSearch("");
    }

    return (
        <>
            <SearchInput
                placeholder="Search for people and friends"
                layout={layout}
                onChange={(e) => getUser(e)}
                value={search}
                onFocus={(e) => clickedInput(e)}
                minLength={3}
                debounceTimeout={300}
            />
            <SearchIcon />
            <SearchResults $display={displayResults} ref={node}>
                {searchResults.length ? (
                    searchResults.map((result) => (
                        <Link
                            to={
                                result.id === user.id
                                    ? "/my-posts"
                                    : `/user/${result.id}`
                            }
                            key={result.id}
                            onClick={clickUser}
                        >
                            <SearchResult layout={layout}>
                                <img
                                    onError={(e) => addDefaultProfileImgSrc(e)}
                                    src={result.avatar}
                                    alt={result.username}
                                />
                                <span>{result.username}</span>
                                {followingUsers.includes(result.id) ? (
                                    <Following>• following</Following>
                                ) : (
                                    ""
                                )}
                            </SearchResult>
                        </Link>
                    ))
                ) : (
                    <p>Nenhum resultado encontrado</p>
                )}
            </SearchResults>
        </>
    );
}

const SearchInput = styled(DebounceInput)`
    width: ${({ layout }) => (layout === "desktop" ? "563px" : "100%")};
    height: 45px;
    background-color: white;
    border-radius: 8px;
    border: none;
    outline: none;
    padding-left: 17px;
    padding-right: 35px;
    font-size: 19px;

    &::placeholder {
        font-family: "Lato", sans-serif;
        color: #c6c6c6;
    }
`;

const SearchIcon = styled(AiOutlineSearch)`
    position: absolute;
    right: 10px;
    top: 11px;
    font-size: 23px;
    color: #c6c6c6;
    cursor: pointer;
`;

const SearchResults = styled.div`
    width: 563px;
    max-height: 285px;
    position: absolute;
    top: 45px;
    background-color: #e7e7e7;
    border-radius: 0 0 8px 8px;
    padding: 14px 17px 7px 17px;
    overflow: auto;
    display: ${({ $display }) => ($display ? "block" : "none")};
    z-index: 10;
    scrollbar-color: #888 #e7e7e7;

    ::-webkit-scrollbar-track {
        background: #e7e7e7;
        border-radius: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }

    ::-webkit-scrollbar {
        width: 7px;
    }

    div {
        margin-bottom: 16px;
    }

    @media (max-width: 800px) {
        width: 100%;
    }

    p {
        margin-bottom: 7px;
        color: #515151;
    }
`;

const SearchResult = styled.div`
    height: 39px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #515151;

    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin-right: 12px;
    }

    span {
        font-size: 19px;
        line-height: 23px;
    }

    span:nth-child(2) {
        max-width: ${({ layout }) =>
            layout === "desktop" ? "378px" : "calc(93vw - 34px - 151px)"};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 8px;
    }

    &:hover {
        img,
        span:nth-child(2) {
            filter: brightness(125%);
        }
    }
`;

const Following = styled.span`
    color: #c5c5c5;
`;
