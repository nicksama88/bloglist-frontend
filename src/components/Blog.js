import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Button } from '@material-ui/core'

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
    padding: 10,
    border: 'solid',
    borderRadius: '10px',
    borderWidth: 1,
    marginBottom: 10,
    boxShadow: '5px 5px #888888',
    background: 'linear-gradient(45deg, aliceblue, antiquewhite)',
  }

  return(
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{`${blog.title}, by ${blog.author}`}</Link>
      <Button
        onClick={callRemoveBlog}
        variant='contained'
        style={{
            display: currentUser.username === blog.user.username ? '' : 'none',
            color: 'white',
            float: 'right',
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        }}
        >x
      </Button>
      <br />
      {blog.likes} like(s)
      <br />
      <Button onClick={updateLikes} variant='contained' color='primary'>
        updoot
      </Button>
    </div>
  )
}

export default Blog
