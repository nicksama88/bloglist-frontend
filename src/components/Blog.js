import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Button, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

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
      <IconButton
        onClick={callRemoveBlog}
        aria-label='delete'
        variant='contained'
        color='secondary'
        style={{
            display: currentUser.username === blog.user.username ? '' : 'none',
            float: 'right',
        }}
        >
          <DeleteIcon />
      </IconButton>
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
