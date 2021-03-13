import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import { 
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Grid,
  } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import ThumbUp from '@material-ui/icons/ThumbUp'

import { addLike, deleteBlog } from '../reducers/blogReducer'

const sepStyle = {
  margin: '0px 16px',
  borderTop: 'thin solid plum',
  paddingTop: 4,
}

const useStyles = makeStyles({
  root: {
    height: 275,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  actionArea: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'normal',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
})

const Blog = ({ blog, currentUser }) => {

  const classes = useStyles()

  const dispatch = useDispatch()

  const updateLikes = (event) => {
    dispatch(addLike(blog.id))
  }

  const callRemoveBlog = (event) => {
    if (window.confirm(
      `Do you really want to delete ${blog.title}, by ${blog.author}?`
    )) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return(
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <CardActionArea className={classes.actionArea} component={Link} to={`/blogs/${blog.id}`}>
          <CardContent>
            <strong>{blog.title}</strong>
            <br />
            {blog.author}
            <br />
            {blog.likes} like(s)
          </CardContent>
        </CardActionArea>
        <div style={sepStyle}/>
        <CardActions className={classes.actions}>
          <Button
            startIcon={<ThumbUp/>} 
            onClick={updateLikes}
            size='large'
            color='primary'
            fullWidth
          />
          <Button
            startIcon={<DeleteIcon/>}
            size='large'
            onClick={callRemoveBlog}
            aria-label='delete'
            color='secondary'
            fullWidth
            disabled={!(currentUser.username === blog.user.username)}
          />
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Blog
