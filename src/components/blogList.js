import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Grid from '@material-ui/core/Grid'

import { addLike, deleteBlog } from '../reducers/blogReducer'

import Blog from './Blog'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}))

const BlogList = ({ user }) => {
  
  const classes = useStyles()

  const blogs = useSelector(state => {
    return state.blogs.sort((a, b) => b.likes - a.likes)
  })

  const dispatch = useDispatch()

  return(
    <div className={classes.root} >
      <Grid container spacing={4}>
          {blogs.map(blog => 
            <Blog
              className={classes.paper}
              key={blog.id}
              blog={blog}
              addLike={(blogId) => dispatch(addLike(blogId))}
              removeBlog={(blogId) => dispatch(deleteBlog(blogId))}
              currentUser={user}
              />
          )}
      </Grid>
    </div>
  )
}

export default BlogList