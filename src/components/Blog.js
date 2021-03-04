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

  return(
    <div className='blog'>
      <Link to={`/blogs/${blog.id}`}>{`${blog.title}, by ${blog.author}`}</Link>
      <Button
        onClick={callRemoveBlog}
        variant='contained'
        style={{
            display: currentUser.username === blog.user.username ? '' : 'none',
            color: 'white',
            float: 'right',
            background: 'linear-gradient(45deg, rgb(125, 53, 13) 30%, #FF0000 90%)',
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
