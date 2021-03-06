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

const commentStyle = {
  marginTop: '1em',
}

const ulStyle = {
  paddingLeft: '20px',
}

const liStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  listStylePosition: 'inside',
}

const useStyles = makeStyles({
  root: {
    background: 'ivory',
    height: 300,
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
  content: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
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
          <CardContent className = {classes.content}>
              <strong>{blog.title}</strong>
              <br />
              {blog.author}
              <br />
              {blog.likes} like(s)
            <div style={commentStyle}>
              <strong>Comments</strong>
              <ul style={ulStyle}>
                {blog.comments.map((comment, index) => {
                  return(
                  index < 3
                    ? <li style={liStyle} key={index}>{comment}</li>
                    : null
                  )
                })}
                {blog.comments.length > 3
                  ? <li style={liStyle} key='ellipse'>...</li>
                  : null}
              </ul>
            </div>
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
