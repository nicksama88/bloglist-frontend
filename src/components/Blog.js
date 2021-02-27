import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, currentUser }) => {

  const [hideDetails, setShowDetails] = useState(true)

  const showDetails = { display: hideDetails ? 'none' : '' }

  const toggleDetails = () => {
    setShowDetails(!hideDetails)
  }

  const updateLikes = () => {
      addLike(blog.id)
  }

  const callRemoveBlog = () => {
    if (window.confirm(
      `Do you really want to delete ${blog.title}, by ${blog.author}?`
    )) {
      removeBlog(blog.id)
    }
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
        <button
          onClick={callRemoveBlog}
          style={
            {display: currentUser.username === blog.user.username ? '' : 'none'}
          }
        >remove</button>
      </div>
    </div>
  )
}

export default Blog
