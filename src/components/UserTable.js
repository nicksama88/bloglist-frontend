import React from 'react'
import User from './User'

const UserTable = ({ users }) => {

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
              userId={user.id}
              />
        )}
        </tbody>
      </table>
    </>
  )

}

export default UserTable