import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  useRouteMatch,
} from 'react-router-dom'

import BlogList from './components/blogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserTable from './components/UserTable'

import blogService from './services/blogs'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {

  let user = useSelector(state => state.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [dispatch])

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    const loggedOutUser = user.name ? user.name : user.username
    dispatch(setUser(null))
    dispatch(setNotification(`${loggedOutUser} logged out`, 'notification'))
  }

  return (
    <div>
      <Notification />
      <div>
        {!user &&
          <LoginForm />
        }
        {user &&
          <>
            <h2>blogs</h2>
                <p>{user.name ? user.name : user.username} logged-in
                  <button onClick={handleLogout}>logout</button>
                </p>
            <Switch>
              <Route path='/users'>
                <UserTable />
              </Route>
              <Route path='/'>
                <BlogForm />
                <BlogList user={user} />
              </Route>
            </Switch>
          </>
        }
      </div>
    </div>
  )
}

export default App