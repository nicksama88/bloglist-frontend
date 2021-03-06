import React from 'react'
import { Link } from 'react-router-dom'
import { TableRow, TableCell } from '@material-ui/core'

const User = ({ username, name, numberOfBlogs, userId }) => {
  return(
    <TableRow>
      <TableCell>
        <Link to={`/users/${userId}`}>{username}</Link>
      </TableCell>
      <TableCell>
        {name}
      </TableCell>
      <TableCell>
        {numberOfBlogs}
      </TableCell>
    </TableRow>
  )
}

export default User