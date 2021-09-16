import styled from "styled-components"
import { useState, useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
import { signIn } from "../../services/api";

import UserContext from "../../contexts/UserContext";

export default function LogIn() {
    const { setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login(e) {
        e.preventDefault();
        setIsLoading(true);
        const body = { email, password };
        const request = signIn(body);
        request.then((res) => {
            setIsLoading(false);
            if(res.status === 200) {
                localStorage.setItem('user',JSON.stringify({
                    ...res.data.user,
                    token: res.data.token
                }));
                setUser(JSON.parse(localStorage.getItem('user')));
                history.push('/timeline');
            }
        });
        request.catch((error) => {
            setIsLoading(false);
            if(error.response.status === 403){ alert('Email ou senha incorretos!') }
            else {alert('Algo deu errado! Por favor, tente novamente.')}
        })
    }

    return (
        <Form onSubmit={login}>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="e-mail" disabled={isLoading} required ></input>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="password" disabled={isLoading} required></input>
            <Button isloading={isLoading} disabled={isLoading} type="submit">Log In</Button>
            <StyledLink to='/signup'>First time? Create an account!</StyledLink>
        </Form>
    );
}

const Form = styled.form`
    width: 430px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 50px 0 50px;
    input {
        font-family: Oswald;
        font-size: 27px;
        font-weight: 700;
        line-height: 40px;
        letter-spacing: 0em;
        margin-bottom: 16px;
        width: 100%;
        height: 65px;
        background: #ffffff;
        border-radius: 6px;
        text-indent: 12px;
        border: none;
    }
    input::placeholder {
        line-height: 40px;
        text-indent: 12px;
        color: #9f9f9f;
    }
    @media (max-width: 900px) {
        width: 280px;
        margin: 0 auto 0 auto;
    }
    @media (max-width: 600px) {
        width: 330px;
        font-size: 22px;
        line-height: 33px;
        input,
        input::placeholder {
            height: 55px;
            font-size: 22px;
            line-height: 33px;
        }
    }
    @media (max-width: 340px) {
        width: 300px;
        margin: 0 auto 0 auto;
    }
`;

const StyledLink = styled(Link)`
    text-align: center;
    font-family: Lato;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-decoration: underline;
    text-underline-offset: 0.1em;
    color: #ffffff;
    @media (mas-width: 600px) {
        margin-top: 26px;
        font-size: 17px;
        line-height: 20px;
    }
`;

const Button = styled.button`
    width: 100%;
    height: 65px;
    margin-bottom: 25px;
    background: #1877f2;
    border-radius: 6px;
    font-family: Oswald;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 0em;
    color: #ffffff;
    border: none;
    cursor: ${(props) => (props.isloading ? "not-allowed" : "pointer")};
    opacity: ${(props) => (props.isloading ? 0.7 : 1)};
    :hover {
        background-color: #18a9f2;
    }
    @media (max-width: 600px) {
        height: 55px;
        font-size: 22px;
        line-height: 33px;
    }
`;
