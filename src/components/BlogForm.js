import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
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
    <Toggleable buttonLabel='create new blog entry' ref={blogFormRef}>
    <div>
      <h2>Create new entry</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='url'
            value={url}
            name='Url'
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type='submit'>create entry</button>
      </form>
    </div>
    </Toggleable>
  )
}

export default BlogForm