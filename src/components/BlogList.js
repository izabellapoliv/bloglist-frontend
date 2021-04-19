import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, setBlogs, setNotification, user }) => {
    if (!blogs) {
        return (<></>)
    }

    blogs.sort((a, b) => b.likes - a.likes)

    return (
        <ul id="blog-list" className="list-group list-group-flush">
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} setBlogs={setBlogs}
                    setNotification={setNotification}
                    blogs={blogs} user={user} />
            )}
        </ul>
    )
}

export default BlogList