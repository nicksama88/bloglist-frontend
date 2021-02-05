import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = (event) => {
    event.preventDefault()
    handleLogin(username.toLocaleLowerCase(), password)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={loginUser}>
      <h2>log in to blog application</h2>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={(event) => setUsername(event.target.value)}
          />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      <button type='submit'>login</button>
      <div>
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