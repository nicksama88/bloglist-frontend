import React from 'react'

const UserDetails = ({ targetUser }) => {

  if (!targetUser) {
    return (
      <h2>
        user not found
      </h2>
    )
  } else {
    return(
      <div className='userDetails'>
        <h2>
          {targetUser.name ? targetUser.name : targetUser.username}
        </h2>
        <h3>
          added blogs
        </h3>
        <ul>
          {targetUser.blogs.map(blog => 
            <li key={blog.id}>
              {blog.title}
            </li>
          )}
        </ul>
      </div>
    )
  }

}

export default UserDetails