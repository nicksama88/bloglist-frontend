import React from 'react'

const User = ({ username, numberOfBlogs }) => {
  return(
    <tr>
      <td>
        {username}
      </td>
      <td>
        {numberOfBlogs}
      </td>
    </tr>
  )
}

export default User