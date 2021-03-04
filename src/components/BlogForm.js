import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { Button, IconButton, TextField } from '@material-ui/core'
import Create from '@material-ui/icons/Create'

import { createBlog } from '../reducers/blogReducer'
import Toggleable from '../components/Toggleable'

const BlogForm = () => {

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog({
      title: title === '' ? undefined : title,
      author: author === '' ? undefined : author,
      url: url === '' ? undefined : url,
      })
    )

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Toggleable
      buttonLabel='create new blog entry' 
      buttonStyle='Create' 
      ref={blogFormRef}
    >
    <div>
      <h2>Create new entry</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label='title'
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
        <TextField
            label='author'
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
        <TextField
            label='url'
            type='url'
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <Button type='submit' startIcon={<Create />}>
          create entry
        </Button>
      </form>
    </div>
    </Toggleable>
  )
}

export default BlogForm