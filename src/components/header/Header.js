import styled from 'styled-components';
import { useContext, useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Search from '../shared/search/Search';
import UserContext from '../../contexts/UserContext';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import standardProfilePicture from '../assets/imgs/profile-standard.jpg';

export default function Header() {
    const { user, setUser } = useContext(UserContext);
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();
    const node = useRef();

    const handleClick = e => {if (node.current && !node.current.contains(e.target)) setShowMenu(false)};

    useEffect(() => { document.addEventListener("mousedown", handleClick) }, []);

    function addDefaultProfileImgSrc(ev) { ev.target.src = standardProfilePicture };

    return(
        <HeaderBox>
            <Logo onClick={() => {history.push('/timeline'); window.scrollTo(0, 0);}}>linkr</Logo>
            <Search layout="desktop"/>
            <Menu ref={node}>
                {!showMenu && <StyledIcon onClick={() => setShowMenu(true)}><IoIosArrowDown/></StyledIcon>}
                {showMenu && <StyledIcon onClick={() => setShowMenu(false)}><IoIosArrowUp/></StyledIcon>}
                <StyledImg>
                    <img onError={(e) => addDefaultProfileImgSrc(e)} alt="Profile" src={user.avatar} onClick={() => setShowMenu(!showMenu)}></img>
                </StyledImg>
                {showMenu && <MenuList>
                    <StyledLink onClick={() => setShowMenu(false)} to="/my-posts">My posts</StyledLink>
                    <StyledLink onClick={() => setShowMenu(false)} to="/my-likes">My likes</StyledLink>
                    <StyledLink to="/" onClick={()=>{localStorage.clear(); setUser(null)}}>Logout</StyledLink>
                </MenuList>}
            </Menu>
        </HeaderBox>
    )
}

const HeaderBox = styled.div`
    width: 100vw;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 17px 0 28px;
    background: #151515;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
`;

const Logo = styled.div`
    font-family: Passion One;
    font-weight: bold;
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    cursor: pointer;
`;

const Menu = styled.div`
    display: flex;
    align-items: center;
`;

const StyledImg = styled.div`
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    margin: 0 0 0 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    & img {
        height: 100%;
    }
`;

const StyledIcon = styled.div`
    color: #FFFFFF;
    cursor: pointer;
    font-size: 20px;
`;

const MenuList = styled.div`
    width: 130px;
    height: 109px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    position: fixed;
    top: 72px;
    right: 0;
    background: #171717;
    border-radius: 0 0 0 20px;
`;

const StyledLink = styled(Link)`
    font-family: Lato;
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
`;