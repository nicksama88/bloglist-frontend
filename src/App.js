import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createMessage = ({ text='', type }) => {
    dispatch(setNotification(text, type, 5))
  }

  const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      createMessage({
        text: `${user.name ? user.name : user.username} successfully logged in`,
        type: 'notification'
      })

    } catch (exception) {
      createMessage({text: exception.response.data.error, type: 'error'})
      console.log(exception.response.data.error)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    const loggedOutUser = user.name ? user.name : user.username
    setUser(null)
    createMessage({text:`${loggedOutUser} logged out`, type:'notification'})
  }

  const handleCreateNew = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedData = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedData))
      createMessage({
        text:`A new blog ${returnedData.title} by ${returnedData.author} added`, 
        type:'notification'})
    } catch (exception) {
      createMessage({text:exception.response.data.error, type:'error'})
      console.log(exception.response.data.error)
    }
  }

  const handleAddLike = async (blogObject, blogId) => {
    try {
      await blogService.addLike(blogObject, blogId)
      const indexToUpdate = blogs.findIndex(blog => blog.id === blogId)
      const tempBlogs = [...blogs]
      tempBlogs[indexToUpdate].likes += 1
      setBlogs(tempBlogs)
    } catch (exception) {
      createMessage({text:exception.response.data.error, type:'error'})
    }
  }

  const handleDeleteBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject)
      const indexToRemove = blogs.findIndex(blog => blog.id === blogObject.id)
      const tempBlogs = blogs.slice(0, indexToRemove)
        .concat(blogs.slice(indexToRemove + 1, blogs.length))
      setBlogs(tempBlogs)
      createMessage({text: 'blog deleted', type: 'notification'})
    } catch (exception) {
      user.username !== blogObject.user.username
        ? createMessage({text:'blog can only be deleted by user who saved it', type:'error'})
        : createMessage({text:exception.response.data.error, type:'error'})
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Toggleable buttonLabel='create new blog entry' ref={blogFormRef}>
      <BlogForm createBlog={handleCreateNew}/>
    </Toggleable>
  )

  return (
    <div>
      <Notification />
      <div>
        {!user &&
          <LoginForm handleLogin={handleLogin} />
        }
        {user &&
          <>
          <h2>blogs</h2>
          <p>{user.name ? user.name : user.username} logged-in
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              addLike={handleAddLike}
              removeBlog={handleDeleteBlog}
              currentUser={user}
            />
          )}
          </>
        }
      </div>
    </div>
  )
}

export default App