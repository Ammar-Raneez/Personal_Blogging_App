import styled from "styled-components"

const Navbar = () => {
    return (
        <Container>
            <nav>
                <a href="/"><img alt="logo" src="images/logo.png"/></a>
            </nav>

            <nav>
                <a href="/">Home</a>
                <a href="/">Posts</a>
                <a href="/">Login</a>
                <a href="/">Logout</a>
            </nav>
        </Container>
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