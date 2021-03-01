import React from 'react'

const BlogDetails = ({ targetBlog }) => {

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
          <br/>
          {targetBlog.likes} likes <button>like</button>
          <br/>
          added by {targetBlog.user.name
            ? targetBlog.user.name
            : targetBlog.user.username
            }
        </p>
      </div>
    )
  }
}

export default BlogDetails