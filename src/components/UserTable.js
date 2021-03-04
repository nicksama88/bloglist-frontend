import React from 'react'

import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@material-ui/core'

import User from './User'

const UserTable = ({ users }) => {

  return(
    <div className='userTable'>
      <h2>
        Users
      </h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>username</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => 
              <User
                key={user.id}
                username={user.username}
                numberOfBlogs={user.blogs.length}
                userId={user.id}
                />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )

}

export default UserTable