import React from 'react'
import { useSelector } from 'react-redux'

import { Alert } from '@material-ui/lab'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  const alertType = notification.className === 'notification'
    ? 'success'
    : 'error'

  return (notification.text
    ? (
      <Alert severity={alertType} className={notification.className}>
        {notification.text}
      </Alert>
    )
    : null
  )
      
}

export default Notification