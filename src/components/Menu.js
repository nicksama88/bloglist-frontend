import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { AppBar, Toolbar, Button } from '@material-ui/core'

import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Menu = ({ user }) => {

  const dispatch = useDispatch()
  const history = useHistory()

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
          <Button
          onClick={handleLogout}
          color='secondary'
          >logout</Button>
        </>
      )
    } else {
      return null
    }
  }

  return (
    <>
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          blogs
        </Button>
        <Button color='inherit' component={Link} to='/users'>
          users
        </Button>
        <em><UserDisplay /></em>
      </Toolbar>
    </AppBar>
    </>
  )
}

export default Menu