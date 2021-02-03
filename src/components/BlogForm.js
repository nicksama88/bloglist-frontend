import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title === '' ? undefined : title,
      author: author === '' ? undefined : author,
      url: url === '' ? undefined : url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
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
  )
}


// const BlogForm = ({ title, setTitle, author, setAuthor, url, setUrl, handleCreateNew }) => {

//   return (
//     <form onSubmit={handleCreateNew}>
//       <h2>create new entry</h2>
//       <div>
//         title:
//         <input
//           type='text'
//           value={title}
//           name='Title'
//           onChange={({ target }) => setTitle(target.value)}
//         />
//       </div>
//       <div>
//         author:
//         <input
//           type='text'
//           value={author}
//           name='Author'
//           onChange={({ target }) => setAuthor(target.value)}
//         />
//       </div>
//       <div>
//         url:
//         <input
//           type='url'
//           value={url}
//           name='Url'
//           onChange={({ target }) => setUrl(target.value)}
//         />
//       </div>
//       <button onClick={handleCreateNew}>create entry</button>
//     </form>
//   )
// }

export default BlogForm