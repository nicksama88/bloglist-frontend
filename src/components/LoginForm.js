import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={loginUser}>
      <h2>log in to application</h2>
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
    </form>
  )

}

export default LoginForm