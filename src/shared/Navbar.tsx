import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { login, logout, selectUser } from "../features/userSlice";
import { auth } from "../firebase";

const Navbar = () => {
    const user = useSelector(selectUser);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useDispatch();

    const toggleModal = () => setShowModal(!showModal);

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch(
                    login({
                        email,
                        password
                    })
                )
            })
            .catch((e) => alert(e));
        setEmail('');
        setPassword('');
        setShowModal(false);
    }

    const signOut = () => {
        setEmail('');
        setPassword('');
        setShowModal(false);
        auth.signOut();
        dispatch(
            logout()
        )
    }

    return (
        <>
            <NavContainer>
                <nav>
                    <a href="/"><img alt="logo" src="images/logo.png"/></a>
                </nav>

                <nav>
                    <a href="/">Posts</a>
                    {user.email === '' && <a onClick={toggleModal}>Login</a>}
                    {user.email !== '' && <a onClick={signOut}>Logout</a>}
                </nav>
            </NavContainer>

            {showModal &&
                <ModalContainer>
                    <div>
                        <div>
                            <h2>Login</h2>
                            <span onClick={toggleModal}>&times;</span>
                        </div>
                        <div>
                            <h4>⭐Login to be able to Add/Delete/Update a Post⭐</h4>
                            <input
                                type="email" 
                                placeholder="email"
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input 
                                type="password" 
                                placeholder="password" 
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button onClick={signIn}>Login</button>
                        </div>
                    </div>
                </ModalContainer>
            }
        </>
    )
}

export default Navbar

const NavContainer = styled.nav `
    overflow: hidden;
    background: transparent;
    display: flex;
    justify-content: space-between;

    > nav:first-child {
        display: flex;
        justify-content: flex-start;

        > a > img {
            width: 3em;
        }
    }

    > nav:last-child {
        display: flex;
        justify-content: flex-end;

        > a {
            display: block;
            text-align: center;
            padding: 8px 12px;
            cursor: pointer;
            text-decoration: none;
            color: #0f0;
            transition: all 0.5s ease;
            font-family: 'Lucida Sans';

            :hover {
                color: white;
            }
        }
    }
`

const ModalContainer = styled.div `
    @keyframes animatetop {
        from {
            top: -300px; 
            opacity: 0
        }
        to {
            top: 0; 
            opacity: 1
        }
    }

    display: flex; 
    position: fixed; 
    z-index: 100; 
    flex-direction: column;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4);

    > div {
        background-color: white;
        position: relative;
        display: flex;
        flex-direction: column;
        margin: auto;
        padding: 0;
        border-radius: 0.7rem;
        width: 60%;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
        animation-name: animatetop;
        animation-duration: 0.4s;
    }

    > div > div:first-child {
        border-radius: 0.7rem 0.7rem 0 0;
        padding: 0.2rem 2rem;
        background-color: darkgreen;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;

        > h2 {
            font-size: 1.4rem;
        }

        > span {
            color: white;
            float: right;
            font-size: 2rem;
            font-weight: bold;
            transition: 0.3s ease;

            :hover, :focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }
        }
    }

    > div > div:last-child {
        padding: 0.7rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0.5rem;

        > * {
            margin: 0.5rem;
            padding: 0.5rem;
        }

        > button {
            background-color: darkgreen;
            color: white;
            width: 30%;
            border: 1px solid darkgreen;
            transition: 0.3s ease;
            cursor: pointer;

            :hover {
                color: darkgreen;
                background-color: white;
            }
        }

        > input {
            width: 100%;
            outline: none;
        }

        > h4 {
            text-align: center;
        }
    }
`