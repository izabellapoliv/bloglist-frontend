import React, { useRef } from 'react'
import BlogDetails from './BlogDetails'
import Togglable from './Togglable'
import DeleteButton from './DeleteButton'

import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, setNotification, blogs, user }) => {
    const blogDetailsRef = useRef()

    const handleLikeBlog = async (event) => {
        event.preventDefault()

        try {
            const newBlog = await blogService.update(blog.id, {
                ...blog, likes: blog.likes + 1
            })

            const newBlogs = blogs.map(blog => {
                return blog.id === newBlog.id ? newBlog : blog
            })
            setBlogs(newBlogs)
            setNotification({ class: 'success', message: `Liked ${newBlog.title} by ${newBlog.author}` })
        } catch (exception) {
            setNotification({ class: 'danger', message: exception.response.data.error })
        }

        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    return (
        <li className="list-group-item each-blog">
            <div className="card">
                <div className="card-body">
                    <div className="fw-bold card-title">
                        <span className="blog-title">{blog.title}</span>
                        <button className="btn text-success btn-sm btn-link float-end"
                            onClick={handleLikeBlog}>Thumbs up!</button>
                    </div>
                    <small className="card-subtitle mb-2 text-muted">by {blog.author}</small>
                    <Togglable buttonLabel="View more" primaryclassName="info btn-sm"
                        ref={blogDetailsRef}>
                        <BlogDetails blog={blog} />
                    </Togglable>
                    <DeleteButton blog={blog} blogs={blogs} user={user}
                        setBlogs={setBlogs} setNotification={setNotification} />
                </div>
            </div>
        </li>
    )
}

export default Blog
