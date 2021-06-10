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
            <Container>
                <nav>
                    <a href="/"><img alt="logo" src="images/logo.png"/></a>
                </nav>

                <nav>
                    <a href="/">Posts</a>
                    {user.email === '' && <a onClick={toggleModal}>Login</a>}
                    {user.email !== '' && <a onClick={signOut}>Logout</a>}
                </nav>
            </Container>

            {showModal &&
                <div style={{ display: 'flex' }} className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span onClick={toggleModal} className="close">&times;</span>
                            <h2>Login</h2>
                        </div>
                        <div className="modal-body">
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
                </div>
            }
        </>
    )
}

export default Navbar

const Container = styled.nav `
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