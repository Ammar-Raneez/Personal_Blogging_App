const Login = () => {
    return (
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
    )
}

export default Login
