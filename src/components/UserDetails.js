import React from 'react'
import userService from '../services/users'

const UserDetails = ({ targetUser }) => {

  return(
    <>
      <h2>
        {targetUser ? targetUser.name : 'user not found'}
      </h2>
      <h3>
        added blogs
      </h3>
      <ul>
        {targetUser
          ? targetUser.blogs.map(blog => 
          <li key={blog.id}>
            {blog.title}
          </li>
          )
          : null
        }
      </ul>
    </>
  )
}

export default UserDetails