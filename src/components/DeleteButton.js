import React from 'react'
import blogService from '../services/blogs'

const DeleteButton = ({ blog, blogs, setBlogs, setNotification, user }) => {
    const handleDeleteBlog = async (event) => {
        event.preventDefault()
        if (window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}??`)) {
            try {
                await blogService.remove(blog.id)
                const newBlogs = blogs.filter(oldBlog => {
                    return blog.id !== oldBlog.id
                })
                setBlogs(newBlogs)
                setNotification({ class: 'success', message: `Removed ${blog.title} by ${blog.author}` })
            } catch (exception) {
                setNotification({ class: 'danger', message: exception.response.data.error })
            }

            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    return (
        <button className="btn text-danger btn-sm btn-link float-end"
            onClick={handleDeleteBlog}>Delete</button>
    )
}

export default DeleteButton