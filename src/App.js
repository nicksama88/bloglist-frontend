import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlogList from './components/blogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

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

  const createMessage = ({ text='', type }) => {
    dispatch(setNotification(text, type))
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    const loggedOutUser = user.name ? user.name : user.username
    dispatch(setUser(null))
    createMessage({text:`${loggedOutUser} logged out`, type:'notification'})
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
          <BlogForm />
          <BlogList user={user} />
          </>
        }
      </div>
    </div>
  )
}

export default App