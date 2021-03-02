import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Menu = ({ user }) => {

  const dispatch = useDispatch()

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    const loggedOutUser = user.name ? user.name : user.username
    dispatch(setUser(null))
    dispatch(setNotification(`${loggedOutUser} logged out`, 'notification'))
  }

  const UserDisplay = () => {
    if (user) {
      const name = user.name ? user.name : user.username
      return (
        <>
          {name} logged-in <button onClick={handleLogout}>logout</button>
        </>
      )
    } else {
      return null
    }
  }

  const padding={
    paddingRight: 5
  }

  const navBar={
    background: 'lightgrey',
    position: 'fixed',
    top: '0',
    overflow: 'hidden',
    width: '100%'
  }

  return (
    <div style={navBar}>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      <em><UserDisplay /></em>
    </div>
  )
}

export default Menu