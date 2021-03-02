import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateOne = async (modifiedBlogObject) => {
  const response = await axios.put(`${baseUrl}/${modifiedBlogObject.id}`, modifiedBlogObject)
  return response.data
}

const addComment = async (blogObject, comment) => {
  const response = await axios.post(`${baseUrl}/${blogObject.id}/comments`, {comment: comment})
  return response.data
}

const remove = async (blogObject) => {
  // will need to have the proper user token
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blogObject.id}`, config)
  return response.data
}

export default { getAll, getOne, setToken, create, updateOne, addComment, remove }