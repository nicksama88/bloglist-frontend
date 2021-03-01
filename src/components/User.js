import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ username, numberOfBlogs, userId }) => {
  return(
    <tr>
      <td>
        <Link to={`/users/${userId}`}>{username}</Link>
      </td>
      <td>
        {numberOfBlogs}
      </td>
    </tr>
  )
}

export default User