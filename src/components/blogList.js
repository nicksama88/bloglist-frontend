import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addLike, deleteBlog } from '../reducers/blogReducer'

import Blog from './Blog'

const BlogList = ({ user }) => {

  const blogs = useSelector(state => {
    return state.blogs.sort((a, b) => b.likes - a.likes)
  })

  const dispatch = useDispatch()

  return(
    blogs.map(blog => 
      <Blog
        key={blog.id}
        blog={blog}
        addLike={(blogId) => dispatch(addLike(blogId))}
        removeBlog={(blogId) => dispatch(deleteBlog(blogId))}
        currentUser={user}
        />
      )
  )
}

export default BlogList