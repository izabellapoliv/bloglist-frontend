import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setNotification, blogFormRef }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleCreateBlog = async (event) => {
        event.preventDefault()

        try {
            const blog = await blogService.create({
                title, author, url
            })

            setBlogs([...blogs, blog])
            setTitle('')
            setAuthor('')
            setUrl('')

            blogFormRef.current.toggleVisibility()
            setNotification({ class: 'success', message: `${title} by ${author} added successfully` })
        } catch (exception) {
            setNotification({ class: 'danger', message: 'Error adding blog' })
        }
        
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    return (
        <form onSubmit={handleCreateBlog}>
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <input type="text" className="form-control"
                        name="Title" placeholder="Title"
                        onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div className="col-lg-6 mb-3">
                    <input type="text" className="form-control"
                        name="Author" placeholder="Author"
                        onChange={(event) => setAuthor(event.target.value)} />
                </div>
                <div className="col-lg-12 mb-3">
                    <input type="text" className="form-control"
                        name="URL" placeholder="URL"
                        onChange={(event) => setUrl(event.target.value)} />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default BlogForm