import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return state.concat(action.data).sort((a, b) => b.likes - a.likes)
    case 'ADD_BLOG':
      return state.concat(action.data)
    case 'LIKE':
      const blogToChange = state.find(blog => blog.id === action.data.id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state
        .map(blog => blog.id !== action.data.id ? blog : changedBlog)
        .sort((a, b) => b.likes - a.likes)
    case 'REMOVE':
      return state
        .filter(blog => blog.id !== action.data.id)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      dispatch({
        type: 'ADD_BLOG',
        data: returnedBlog,
      })
      dispatch(setNotification(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        'notification'
      ))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 7))
      console.log(exception.response.data.error)
    }
    
  }
}

export const addLike = (id) => {
  return async dispatch => {
    try{
      const blogToChange = await blogService.getOne(id)
      blogToChange.likes += 1
      const changedBlog = await blogService.updateOne(blogToChange)
      dispatch({
        type: 'LIKE',
        data: changedBlog,
      })
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 7))
      console.log(exception.response.data.error)
    }
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      const blogToRemove = await blogService.getOne(id)
      await blogService.remove(blogToRemove)
      dispatch({
        type: 'REMOVE',
        data: blogToRemove
      })
      dispatch(setNotification(
        `Blog ${blogToRemove.title} has been removed`, 'notification'))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 7))
      console.log(exception.response.data.error)
    }
  }
}

export default blogReducer