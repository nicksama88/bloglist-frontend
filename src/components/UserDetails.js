import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'

const UserDetails = ({ targetUser }) => {

  const history = useHistory()

  if (!targetUser) {
    return (
      <h2>
        user not found
      </h2>
    )
  } else {
    return(
      <div className='userDetails'>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBack />
        </IconButton>
        <h2>
          {targetUser.name ? targetUser.name : targetUser.username}
        </h2>
        <h3>
          blogs added
        </h3>
        <ul>
          {targetUser.blogs.map(blog => 
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          )}
        </ul>
      </div>
    )
  }

}

export default UserDetails