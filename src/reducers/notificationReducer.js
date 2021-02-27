const initialState = {
  text: null,
  timerId: undefined,
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NOTIFICATION':
      clearTimeout(state.timerId)
      return action.data
    default:
      return state
  }
}

const clearNotification = {
  type: 'NOTIFICATION',
  data: {
    text: null,
    className: 'notification',
    timerId: undefined,
  }
}

export const setNotification = (text, className, timer) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: {
        text,
        className,
        timerId: setTimeout(() => dispatch(clearNotification), timer * 1000)
      },
    })
  }
}

export default notificationReducer