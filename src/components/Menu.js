import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { AppBar, Toolbar, Button } from '@material-ui/core'

import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Menu = ({ user }) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const spanStyle = {
    padding: '6px 8px',
    height: '24.5px',
    marginLeft: 'auto',
    display: 'table',
    textAlign: 'center',
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    const loggedOutUser = user.name ? user.name : user.username
    dispatch(setUser(null))
    dispatch(setNotification(`${loggedOutUser} logged out`, 'notification'))
    history.push('/')
  }

  const UserDisplay = () => {
    if (user) {
      const name = user.name ? user.name : user.username
      return (
        <>
          {name} logged-in
        </>
      )
    } else {
      return null
    }
  }

  return (
    <>
    <AppBar color='inherit' >
      <Toolbar>
        <Button component={Link} to='/' >
          blogs
        </Button>
        <Button component={Link} to='/users'>
          users
        </Button>
        <Button onClick={handleLogout} color='secondary'>
          logout
        </Button>
        <span style={spanStyle}>
          <em><UserDisplay /></em>
        </span>
      </Toolbar>
    </AppBar>
    </>
  )
}

export default Menu