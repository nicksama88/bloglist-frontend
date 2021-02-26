import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return state.concat(action.data).sort((a, b) => b.likes - a.likes)
    case 'ADD_BLOG':
      return state.concat(action.data)
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
        'notification',
        5
      ))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 5))
      console.log(exception.response.data.error)
    }
    
  }
}

export default blogReducer