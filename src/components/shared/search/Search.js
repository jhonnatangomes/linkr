import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import SearchContent from "./SearchContent";

export default function Search({ layout }) {
    const [displayResults, setDisplayResults] = useState(false);
    const node = useRef();

    const handleClick = e => {if (node.current && !node.current.contains(e.target)) setDisplayResults(false)};

    useEffect(() => { document.addEventListener("mousedown", handleClick) }, []);

    return (
        <>
            {layout === "desktop" ? (
                <ContainerDesktop $display={displayResults} ref={node}>
                    <SearchContent
                        layout={layout}
                        displayResults={displayResults}
                        setDisplayResults={setDisplayResults}
                    />
                </ContainerDesktop>
            ) : (
                <ContainerMobile $display={displayResults} ref={node}>
                    <SearchContent
                        layout={layout}
                        displayResults={displayResults}
                        setDisplayResults={setDisplayResults}
                    />
                </ContainerMobile>
            )}
        </>
    );
}

const ContainerDesktop = styled.div`
    position: relative;
    background-color: #e7e7e7;
    border-radius: ${({ $display }) => ($display ? "8px 8px 0 0" : "8px")};
    z-index: 4;

    @media (max-width: 800px) {
        display: none;
    }
`;

const ContainerMobile = styled.div`
    position: relative;
    margin: 10px auto 0 auto;
    width: 93%;
    border-radius: ${({ $display }) => ($display ? "8px 8px 0 0" : "8px")};
    background-color: #e7e7e7;
    z-index: 4;

    @media (min-width: 800px) {
        display: none;
    }
`;
