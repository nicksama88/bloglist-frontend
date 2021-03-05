import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import ThumbUp from '@material-ui/icons/ThumbUp'

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
      <IconButton
        onClick={callRemoveBlog}
        aria-label='delete'
        color='secondary'
        style={{
            display: currentUser.username === blog.user.username ? '' : 'none',
            float: 'right',
        }}
        >
          <DeleteIcon />
      </IconButton>
      <Link to={`/blogs/${blog.id}`}>{`${blog.title}`}</Link>
      <br />
      {blog.author}
      <br />
      {blog.likes} like(s)
      <br />
      <IconButton onClick={updateLikes} variant='contained' color='primary'>
        <ThumbUp/>
      </IconButton>
    </div>
  )
}

export default Blog
