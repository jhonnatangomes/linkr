import styled from "styled-components";
import { useState } from "react";
import SearchContent from "./SearchContent";

export default function Search({ layout }) {
    const [displayResults, setDisplayResults] = useState(false);

    return (
        <>
            {layout === "desktop" ? (
                <ContainerDesktop $display={displayResults}>
                    <SearchContent
                        layout={layout}
                        displayResults={displayResults}
                        setDisplayResults={setDisplayResults}
                    />
                </ContainerDesktop>
            ) : (
                <ContainerMobile $display={displayResults}>
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

    @media (min-width: 800px) {
        display: none;
    }
`;
