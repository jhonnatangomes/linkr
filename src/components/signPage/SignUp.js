import styled from "styled-components";
import { signUp } from "../../services/api";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    function signup(e) {
        e.preventDefault();
        if (pictureUrl.match(/\.(jpeg|jpg|gif|png|svg)$/) != null) {
            setIsLoading(true);
            const body = { email, password, username, pictureUrl };
            const request = signUp(body);
            request.then((res) => {
                setIsLoading(false);
                if (res.status === 200) {
                    history.push("/");
                }
            });
            request.catch((error) => {
                if (error.response.status === 403) {
                    alert("Este email já está cadastrado!");
                } else {
                    alert("Algo deu errado. Por favor, tente novamente!");
                }
                setIsLoading(false);
            });
        } else {
            alert("Please, provide a valid picture URL");
        }
    }

    return (
        <Form onSubmit={signup}>
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="e-mail"
                required
            ></input>
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="password"
                required
            ></input>
            <input
                onChange={(e) => setUserName(e.target.value)}
                value={username}
                type="text"
                placeholder="username"
                required
            ></input>
            <input
                onChange={(e) => setPictureUrl(e.target.value)}
                value={pictureUrl}
                type="text"
                placeholder="picture url"
                required
            ></input>
            <Button isloading={isLoading} disabled={isLoading} type="submit">
                Sign Up
            </Button>
            <StyledLink to="/">Switch back to log in</StyledLink>
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
    margin-bottom: 30px;
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
