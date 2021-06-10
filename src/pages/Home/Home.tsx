import styled from "styled-components"
import Navbar from "../../shared/Navbar"

const Home = () => {
    return (
        <Container>
            <div className="add-post hide">
                <a href="/">
                    <div className="nav-button new-post-buton">+</div>
                </a>
            </div>

            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close">&times;</span>
                        <h2>Login</h2>
                    </div>
                    <div className="modal-body">
                        <h4>⭐Login to be able to Add/Delete/Update a Post⭐</h4>
                        <input type="email" id="email" placeholder="email" />
                        <input type="password" id="password" placeholder="password" />
                        <button id="login">Login</button>
                    </div>
                </div>
            </div>

            <Navbar />

            <header>           
                <div className="profile-image"></div>
                <div className="profile-name">Ammar Raneez</div>
                <div className="sub-text"><em>~We Were All Beginners At Some Point~</em></div>
            </header>

            <div className="main">
                <div className="main-container" id="blog-posts">
                </div>
            </div>

            <footer>
                <p id="copyright">Copyright &copy; <span id="date"></span> Ammar Raneez ❤️ All Rights Reserved.</p>
            </footer>
        </Container>
    )
}

export default Home

const Container = styled.div `
`