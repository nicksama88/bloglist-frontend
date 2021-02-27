import React, { useState, useEffect } from 'react'
import User from './User'
import userService from '../services/users'

const UserTable = () => {
  const [users, setUsers] = useState([])
  console.log('users is ', users)

  useEffect(() => {

    const fetchUsers = async () => {
      const usersResponse = await userService.getAll()
      setUsers(usersResponse)
  }
    fetchUsers()
  }, [])

  return(
    <>
      <h2>
        Users
      </h2>
      <table>
        <thead>
          <tr>
            <th>
              username
            </th>
            <th>
              blogs created
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => 
            <User
              key={user.id}
              username={user.username}
              numberOfBlogs={user.blogs.length}
              />
        )}
        </tbody>
      </table>
    </>
  )

}

export default UserTable