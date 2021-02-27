import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addLike } from '../reducers/blogReducer'

import Blog from '../components/Blog'

const BlogList = (user) => {

  const blogs = useSelector(state => {
    return state.blogs.sort((a, b) => b.likes - a.likes)
  })

  const dispatch = useDispatch()

  const handleAddLike = (blogId) => {
    dispatch(addLike(blogId))
  }

  const handleDeleteBlog = async (blogObject) => {
    // try {
    //   await blogService.remove(blogObject)
    //   const indexToRemove = blogs.findIndex(blog => blog.id === blogObject.id)
    //   const tempBlogs = blogs.slice(0, indexToRemove)
    //     .concat(blogs.slice(indexToRemove + 1, blogs.length))
    //   setBlogs(tempBlogs)
    //   createMessage({text: 'blog deleted', type: 'notification'})
    // } catch (exception) {
    //   user.username !== blogObject.user.username
    //     ? createMessage({text:'blog can only be deleted by user who saved it', type:'error'})
    //     : createMessage({text:exception.response.data.error, type:'error'})
    // }
  }

  return(
    blogs.map(blog => 
      <Blog
        key={blog.id}
        blog={blog}
        addLike={handleAddLike}
        removeBlog={handleDeleteBlog}
        currentUser={user}
        />
      )
  )
}

export default BlogList