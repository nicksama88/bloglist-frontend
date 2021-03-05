import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { TextField, IconButton } from '@material-ui/core'
import Create from '@material-ui/icons/Create'
import ThumbUp from '@material-ui/icons/ThumbUp'
import DeleteIcon from '@material-ui/icons/Delete'
import ArrowBack from '@material-ui/icons/ArrowBack'

import { addLike, deleteBlog, addComment } from '../reducers/blogReducer'

const BlogDetails = ({ targetBlog, currentUser }) => {

  const history = useHistory()

  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const updateLikes = () => {
    dispatch(addLike(targetBlog.id))
  }

  const callRemoveBlog = () => {
    if (window.confirm(
      `Do you really want to delete ${targetBlog.title}, by ${targetBlog.author}?`
    )) {
      dispatch(deleteBlog(targetBlog.id))
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(addComment(targetBlog.id, comment))
    setComment('')
  }

  if (!targetBlog) {
    return (
      <h2>
        blog not found
      </h2>
    )
  } else {
    return(
      <div className='blogDetails'>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBack />
        </IconButton>
        <IconButton
            onClick={callRemoveBlog}
            variant='contained'
            aria-label='delete'
            color='secondary'
            style={{
                display: currentUser.username === targetBlog.user.username
                ? ''
                : 'none',
                float: 'right',
              }}
        >
          <DeleteIcon />
        </IconButton>
        <h2>
          {targetBlog.title} by {targetBlog.author}
        </h2>
        <p>
          <a href={targetBlog.url}>{targetBlog.url}</a>
          <br />
          {targetBlog.likes} likes 
          <IconButton onClick={updateLikes}>
            <ThumbUp color='primary'/>
          </IconButton>
          <br />
          added by {targetBlog.user.name
            ? targetBlog.user.name
            : targetBlog.user.username
            }
          <br />
          
        </p>
        <h3>
          Comments
        </h3>
        <form onSubmit={handleComment}>
          <TextField
            label='comment'
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <IconButton>
            <Create />
          </IconButton>
        </form>
        <ul>
          {targetBlog.comments.map((comment, index) => {
            return(
              <li key={index}>
                {comment}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default BlogDetails