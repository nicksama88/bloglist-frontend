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

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async (modifiedBlogObject, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, modifiedBlogObject)
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

export default { getAll, setToken, create, addLike, remove }