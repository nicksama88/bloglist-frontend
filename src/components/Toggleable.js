import React, { useState, useImperativeHandle, forwardRef } from 'react'

import Button from '@material-ui/core/Button'
import Create from '@material-ui/icons/Create'
import Cancel from '@material-ui/icons/Cancel'

const Toggleable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const choiceObj = {
    Create: <Create />
  }

  return (
    <div style={{padding: 10}}>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          startIcon={choiceObj[props.buttonStyle]}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          onClick={toggleVisibility}
          startIcon={<Cancel />}
          color='secondary'
        >
          cancel
        </Button>
      </div>
    </div>
  )
})

export default Toggleable