import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Button } from '@material-ui/core'

import loginService from '../services/login'
import blogService from '../services/blogs'

import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (username, password) => {

    try {
      const responseUser = await loginService.login({
        username, password
      })
  
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(responseUser))
      blogService.setToken(responseUser.token)
      dispatch(setUser(responseUser))
      dispatch(setNotification(
        `${responseUser.name ? responseUser.name : responseUser.username} successfully logged in`,
        'notification'
        )
      )
  
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 10))
      console.log(exception.response.data.error)
    }
  }

  const loginUser = (event) => {
    event.preventDefault()
    handleLogin(username.toLocaleLowerCase(), password)
    setUsername('')
    setPassword('')
  }

  return (
    <form className='loginForm' onSubmit={loginUser}>
      <h2>log in to blog application</h2>
      <div>
        <TextField 
          label='username'
          variant='outlined'
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <br/>
      <div>
        <TextField 
          label='password' 
          variant='outlined'
          type='password' 
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <br/>
      <Button variant='contained' color='primary' type='submit'>login</Button>
      <div>
        <br/>
        Feel free to login with the following credentials:
        <ul>
          <li>
            Username: guest
          </li>
          <li>
            Password: gimmieblogs
          </li>
        </ul>
        Also, please don't save anything too weird while you are here!
      </div>
    </form>
  )

}

export default LoginForm