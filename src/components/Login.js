import React from 'react'
const Login = ({ handleLogin, username, password, onChangeUsername, onChangePassword }) => (
    <div>
        <h1>Login to your account</h1>
        <form onSubmit={handleLogin}>
            <label>Username:</label>
            <br />
            <input type="text" value={username} onChange={onChangeUsername} />
            <br /><br />
            <label>Password:</label>
            <br />
            <input type="password" value={password} onChange={onChangePassword} />
            <hr />
            <button type="submit">Login</button>
        </form>
    </div>
)

export default Login