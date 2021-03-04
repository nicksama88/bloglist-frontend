import React from 'react'
import { useHistory } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton
} from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'

import User from './User'

const UserTable = ({ users }) => {

  const history = useHistory()

  return(
    <div className='userTable'>
      <IconButton onClick={() => history.goBack()}>
          <ArrowBack />
      </IconButton>
      <h2>
        Users
      </h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>username</TableCell>
              <TableCell>name</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => 
              <User
                key={user.id}
                username={user.username}
                name={user.name}
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