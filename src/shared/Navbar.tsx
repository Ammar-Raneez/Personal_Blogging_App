import styled from "styled-components"

const Navbar = () => {
    return (
        <Container id="topnav" className="topnav">
            <nav className="profile-nav">
                <a href=""><img src="images/logo.png"/></a>
            </nav>

            <nav className="login-nav">
                <a href="#">Home</a>
                <a href="#">Posts</a>
                <a id="modalBtn">Login</a>
                <a id="logout" className="hide">Logout</a>
            </nav>
        </Container>
    )
}

export default Navbar

const Container = styled.nav `
`