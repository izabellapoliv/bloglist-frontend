import React, { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'

const Login = ({ setUser, setToken, setNotification }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            setUser(user)
            setToken(user.token)

            setUsername('');
            setPassword('');
            setNotification({ class: 'success', message: 'Logged in successfully' })
        } catch (exception) {
            setNotification({ class: 'danger', message: 'Incorrect credentials' })
        }

        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    return (
        <div className="form-signin">
            <form onSubmit={handleLogin}>
                <div className="form-floating">
                    <input type="text" className="form-control" name="username"
                        onChange={(event) => setUsername(event.target.value)} />
                    <label>username</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" name="password"
                        onChange={(event) => setPassword(event.target.value)} />
                    <label>password</label>
                </div>
                <br />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </div>
    )
}

Login.propTypes = {
    setUser: PropTypes.func.isRequired,
    setToken: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
}

export default Login