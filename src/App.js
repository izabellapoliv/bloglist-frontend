import React, { useState, useEffect } from 'react';
import Notification from './components/Notification'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ text: '', type: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService
        .login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({ text: 'Logged In Successfully', type: 'success' })
    } catch (exception) {
      setNotification({ text: 'Invalid Credentials', type: 'error' })
    }
    setTimeout(() => {
      setNotification({ text: '', type: '' })
    }, 5000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setNotification({ text: 'Logged Out Successfully', type: 'success' })
  }

  const handleCreateBlog = async event => {
    try {
      event.preventDefault()
      const blogObj = {
        title: document.getElementById('blogTitle').value,
        author: document.getElementById('blogAuthor').value,
        url: document.getElementById('blogUrl').value
      }

      const newBlog = await blogService.create(blogObj)
      setBlogs(blogs.concat(newBlog))

      document.getElementById('blogTitle').value = ''
      document.getElementById('blogAuthor').value = ''
      document.getElementById('blogUrl').value = ''

      setNotification({ text: 'Blog Created Successfully', type: 'success' })
    } catch (exception) {
      setNotification({ text: 'Error Creating Blog', type: 'error' })
    }
    setTimeout(() => {
      setNotification({ text: '', type: '' })
    }, 5000)
  }

  return (
    <div>
      <Notification message={notification.text} type={notification.type} />
      {
        user === null ?
          <Login handleLogin={handleLogin}
            username={username}
            password={password}
            onChangeUsername={({ target }) => setUsername(target.value)}
            onChangePassword={({ target }) => setPassword(target.value)}
          /> :
          <>
            <h1>Blogs</h1>
            <p>
              <b>{user.name}</b> is logged in
              &nbsp;
            <button onClick={handleLogout}>Click here to logout</button>
            </p>
            <BlogForm handleCreateBlog={handleCreateBlog} />
            <hr />
            <BlogList user={user} blogs={blogs}
              handleLogout={handleLogout} />
          </>
      }

    </div>
  );
}

export default App;
