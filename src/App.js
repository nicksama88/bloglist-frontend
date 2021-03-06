import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom'

import { Container } from '@material-ui/core'

import Menu from './components/Menu'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserTable from './components/UserTable'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'

import blogService from './services/blogs'
import userService from './services/users'

import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const usersResponse = await userService.getAll()
      setUsers(usersResponse)
  }
    fetchUsers()
  }, [])

  const matchUser = useRouteMatch('/users/:id')
  const targetUser = matchUser
    ? users.find(user => {
        return(user.id === matchUser.params.id)
      })
    : null

  let blogs = useSelector(state => state.blogs)
  
  const matchBlog = useRouteMatch('/blogs/:id')
  const targetBlog = matchBlog
    ? blogs.find(blog => {
      return(blog.id === matchBlog.params.id)
    })
    : null

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

  return (
    <Container>
      <div>
        {user && 
          <Menu user={user} />
        }
        <Notification />
        <div>
          {!user &&
            <LoginForm />
          }
          {user &&
            <>
              <Switch>
                <Route path='/users/:id'>
                  <UserDetails targetUser={targetUser} />
                </Route>
                <Route path='/users'>
                  <UserTable users={users}/>
                </Route>
                <Route path='/blogs/:id'>
                  <BlogDetails targetBlog={targetBlog} currentUser={user} />
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
    </Container>
  )
}

export default App