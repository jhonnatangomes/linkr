import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import searchUser from "../../../services/searchApi";

export default function Search({ layout }) {
    const { user } = useContext(UserContext);
    const [displayResults, setDisplayResults] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    function getUser(e) {
        setSearch(e.target.value);
        setDisplayResults(!!e.target.value);
        if (e.target.value) {
            const request = searchUser(e.target.value, user.token);
            request.then((res) => {
                setSearchResults(res.data.users);
            });
        }
    }

    return (
        <>
            {layout === "desktop" ? (
                <ContainerDesktop $display={displayResults}>
                    <SearchInput
                        placeholder="Search for people and friends"
                        layout="desktop"
                        onChange={(e) => getUser(e)}
                        value={search}
                    />
                    <SearchIcon />
                    <SearchResults $display={displayResults}>
                        {searchResults.map((result) => (
                            <SearchResult>
                                <img
                                    src={result.avatar}
                                    alt={result.username}
                                />
                                <span>{result.username}</span>
                            </SearchResult>
                        ))}
                        {/* <SearchResult>
                            <img src={user.avatar} alt={user.username} />
                            <span>{user.username}</span>
                            <Following>• following</Following>
                        </SearchResult> */}
                    </SearchResults>
                </ContainerDesktop>
            ) : (
                <ContainerMobile>
                    <SearchInput
                        placeholder="Search for people and friends"
                        layout="mobile"
                    />
                    <SearchIcon />
                </ContainerMobile>
            )}
        </>
    );
}

const ContainerDesktop = styled.div`
    position: relative;
    background-color: #e7e7e7;
    border-radius: ${({ $display }) => ($display ? "8px 8px 0 0" : "8px")};

    @media (max-width: 800px) {
        display: none;
    }
`;

const ContainerMobile = styled.div`
    position: relative;
    margin: 10px auto 0 auto;
    width: 93%;

    @media (min-width: 800px) {
        display: none;
    }
`;

const SearchInput = styled.input`
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
    padding: 14px 17px 23px 17px;
    overflow: auto;
    display: ${({ $display }) => ($display ? "block" : "none")};

    & div:not(:last-child) {
        margin-bottom: 16px;
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
        max-width: 378px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 8px;
    }

`;

const Following = styled.span`
    color: #c5c5c5;
`;
