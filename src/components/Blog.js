import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import { 
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button
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
    width: 275,
    height: 275,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  actionArea: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'normal',
    // borderBottom: 'thin solid plum'
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
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <CardContent>          
          <Link to={`/blogs/${blog.id}`}>{`${blog.title}`}</Link>
          <br />
          {blog.author}
          <br />
          {blog.likes} like(s)
        </CardContent>
      </CardActionArea>
      <div style={sepStyle}/>
      <CardActions className={classes.actions}>
        <Button startIcon={<ThumbUp/>} onClick={updateLikes} variant='text' size='large' color='primary' />
        <Button
          startIcon={<DeleteIcon/>}
          size='large'
          onClick={callRemoveBlog}
          aria-label='delete'
          color='secondary'
          style={{
              display: currentUser.username === blog.user.username ? '' : 'none',
          }}
          >
        </Button>
      </CardActions>
    </Card>
  )
}

export default Blog
