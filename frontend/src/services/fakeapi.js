import axios from 'axios'

const getAllProjects = async() => {
  const request = axios.get('http://localhost:3001/project')
  return request.then(response => response.data)
}

const createProject = async(newObject) => {
  const request = axios.post('http://localhost:3001/project', newObject)
  return request.then(response => response.data)
}

const getAllGrouppages = async() => {
  const request = axios.get('http://localhost:3001/grouppage')
  return request.then(response => response.data)
}
const createGrouppage = async (newObject) => {
  const request = axios.post('http://localhost:3001/grouppage', newObject)
  return request.then(response => response.data)
}
const deleteProject = async(id) => {
  axios.delete(`http://localhost:3001/project/${id}`)
  // return request.then(response => response.data)
}
const deleteGrouppage = async(id) => {
  axios.delete(`http://localhost:3001/grouppage/${id}`)
  // return request.then(response => response.data)
}
// const update = (id, newObject) => {
//   const request = axios.put(`http://localhost:3001/project'}/${id}`, newObject)
//   return request.then(response => response.data)
// }

export default { getAllProjects,getAllGrouppages, createProject, createGrouppage, deleteProject, deleteGrouppage }