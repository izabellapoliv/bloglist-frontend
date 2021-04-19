import React, { useState, useEffect, useRef } from 'react'

import HeadPage from './components/HeadPage'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'

import blogService from './services/blogs'
import Navbar from './components/Navbar'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const blogFormRef = useRef()

    const blogForm = () => (
        <div>
            <Togglable buttonLabel="+ New blog" primaryclassName="success"
                ref={blogFormRef} idButton="new-blog">
                <BlogForm blogs={blogs} setBlogs={setBlogs}
                    setNotification={setNotification}
                    blogFormRef={blogFormRef} />
            </Togglable>
            <BlogList blogs={blogs} setBlogs={setBlogs}
                setNotification={setNotification}
                user={user} />
        </div>
    )

    const loginForm = () => (
        <Login setUser={setUser}
            setToken={blogService.setToken}
            setNotification={setNotification} />
    )

    const logout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    return (
        <>
            <HeadPage />
            <div className="body">
                <h1 className="h3 mb-3 fw-normal text-center">Blogs</h1>
                <Notification notification={notification} />

                {user === null ?
                    loginForm() :
                    <div>
                        <Navbar user={user} logout={logout} />
                        {blogForm()}
                    </div>
                }
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
                crossOrigin="anonymous"></script>
        </>
    )
}

export default App