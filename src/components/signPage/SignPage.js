import styled from "styled-components"
import { useLocation } from "react-router";
import { useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import LogIn from './LogIn';
import SignUp from './SignUp';

export default function SignPage() {
    const { user } = useContext(UserContext);
    let local = useLocation().pathname;
    const history = useHistory();

    useEffect(()=>{
        if(user!==null) history.push('/timeline')
    },[user, history]);

    return (
        <SignPageBox>
            <CoverBox>
                <Text>
                    <Title>linkr</Title>
                    <Subtitle>save, share and discover the best links on the web</Subtitle>
                </Text>
            </CoverBox>
            {local === '/' && <LogIn/>}
            {local === '/signup' && <SignUp/>}
        </SignPageBox>
    );
}

const SignPageBox = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    @media(max-width: 600px) {
        flex-direction: column;
        align-items: center;
    }
`

const CoverBox = styled.div`
    width: calc(100vw - 530px);
    display: flex;
    align-items: center;
    background: #151515;
    box-shadow: 4px 0px 4px 0px #00000040;
    color:#FFF;
    font-weight: 700;
    @media(max-width: 900px) {
        width: calc(100vw - 330px);
    }
    @media(max-width: 600px) {
        width: 100%;
        flex-direction:column;
        align-items:center;
        padding:20px 0 30px 0;
        background: #151515;
        box-shadow: 0px 4px 4px 0px #00000040;
        margin-bottom:40px;
    }
`

const Text = styled.div`
    width: 460px;
    margin: 0 0 50px 14%;
    @media(max-width: 600px) {
        width: auto;
        margin: 0;
    }
`;

const Title = styled.h1`
    width: 100%;
    font-family: Passion One;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    margin-bottom: 20px;
    @media(max-width: 600px) {
        font-size: 76px;
        line-height: 84px;
        text-align: center;
        width: 240px;
        margin: 0;
    }
`;

const Subtitle = styled.h1`
    width: 100%;
    font-family: Oswald;
    font-size: 43px;
    line-height: 64px;
    letter-spacing: 0em;
    @media(max-width: 600px) {
        font-size: 23px;
        line-height: 34px;
        text-align: center;
        width: 240px;
    }
`;