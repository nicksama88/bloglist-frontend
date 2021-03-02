import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { addLike, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, currentUser }) => {

  const dispatch = useDispatch()

  const updateLikes = () => {
    dispatch(addLike(blog.id))
  }

  const callRemoveBlog = () => {
    if (window.confirm(
      `Do you really want to delete ${blog.title}, by ${blog.author}?`
    )) {
      dispatch(deleteBlog(blog.id))
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
      <Link to={`/blogs/${blog.id}`}>{`${blog.title}, by ${blog.author}`}</Link>
      <button
        onClick={callRemoveBlog}
        style={{
            display: currentUser.username === blog.user.username ? '' : 'none',
            background: 'red',
            color: 'blue'
        }}
        >x
      </button>
      <br />
      {blog.likes} like(s)
      <button onClick={updateLikes}>
        updoot
      </button>
    </div>
  )
}

export default Blog
