import React from 'react'
import { useDispatch } from 'react-redux'

import { addLike, deleteBlog } from '../reducers/blogReducer'

const BlogDetails = ({ targetBlog, currentUser }) => {

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

  if (!targetBlog) {
    return (
      <h2>
        blog not found
      </h2>
    )
  } else {
    return(
      <div>
        <h2>
          {targetBlog.title}
        </h2>
        <p>
          <a href={targetBlog.url}>{targetBlog.url}</a>
          <br />
          {targetBlog.likes} likes <button onClick={updateLikes}>like</button>
          <br />
          added by {targetBlog.user.name
            ? targetBlog.user.name
            : targetBlog.user.username
            }
          <br />
          <button
            onClick={callRemoveBlog}
            style={
              {display: currentUser.username === targetBlog.user.username
                ? ''
                : 'none'}
            }
            >remove
          </button>
        </p>
      </div>
    )
  }
}

export default BlogDetails