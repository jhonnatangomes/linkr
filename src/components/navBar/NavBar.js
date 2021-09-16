import styled from "styled-components";

export default function NavBar() {
    return (
        <>
            <NavBarStyle></NavBarStyle>
        </>
    );
}

const NavBarStyle = styled.nav`
    background: #151515;
    height: 72px;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
`;
