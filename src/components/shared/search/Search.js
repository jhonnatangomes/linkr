import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

export default function Search({ layout }) {
    if(layout === "desktop") {
		return (
			<ContainerDesktop>
				<SearchInput placeholder="Search for people and friends" layout="desktop"/>
                <SearchIcon />
			</ContainerDesktop>
		)
	}
	return (
		<ContainerMobile>
			<SearchInput placeholder="Search for people and friends" layout="mobile"/>
            <SearchIcon />
		</ContainerMobile>
	)
}

const ContainerDesktop = styled.div`
    position: relative;

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
    width: ${({layout}) => layout === "desktop" ? "563px" : "100%"};
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
