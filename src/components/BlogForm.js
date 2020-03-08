import React from 'react'

const BlogForm = ({ handleCreateBlog }) => (
    <form onSubmit={handleCreateBlog}>
        <label>Title: </label>
        <input id="blogTitle" type="text" />
        <br />
        <label>Author: </label>
        <input id="blogAuthor" type="text" />
        <br />
        <label>Url: </label>
        <input id="blogUrl" type="text" />
        <br /><br />
        <button type="submit">+ Add new blog</button>
    </form>
)

export default BlogForm