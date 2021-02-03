import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {

  const [hideDetails, setShowDetails] = useState(true)
  const [likes, setLikes] = useState(blog.likes)

  const showDetails = { display: hideDetails ? 'none' : '' }

  const toggleDetails = () => {
    setShowDetails(!hideDetails)
  }

  const updateLikes = () => {

      const updatedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: likes + 1,
      }

      addLike(updatedBlog, blog.id)
      setLikes(likes + 1)

  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <div>
        {blog.title}, by {blog.author}
        <button onClick={toggleDetails}>
          {hideDetails ? 'show details' : 'hide details'}
        </button>
      </div>
      <div style={showDetails}>
        <ul style={{listStyleType: 'none'}}>
          <li>
            {blog.url}            
          </li>
          <li>
            likes {blog.likes}
            <button onClick={updateLikes}>
              like
            </button>
          </li>
          <li>
            saved by {blog.user.name ? blog.user.name : blog.user.username}
          </li>
        </ul>
        <button>remove</button>
      </div>
    </div>
  )
}

export default Blog
