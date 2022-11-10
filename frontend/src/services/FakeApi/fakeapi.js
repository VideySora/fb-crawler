import axios from 'axios'

const getAllProjects = () => {
  const request = axios.get('http://localhost:3001/project')
  return request.then(response => response.data)
}

const createProject = newObject => {
  const request = axios.post('http://localhost:3001/project', newObject)
  return request.then(response => response.data)
}

const getAllGrouppages = () => {
  const request = axios.get('http://localhost:3001/grouppage')
  return request.then(response => response.data)
}
const createGrouppage = newObject => {
  const request = axios.post('http://localhost:3001/grouppage', newObject)
  return request.then(response => response.data)
}
const deleteProject = (id) => {
  const request = axios.delete(`http://localhost:3001/project/${id}`)
  return request.then(response => response.data)
}
const deleteGrouppage = (id) => {
  const request = axios.delete(`http://localhost:3001/grouppage/${id}`)
  return request.then(response => response.data)
}
// const update = (id, newObject) => {
//   const request = axios.put(`http://localhost:3001/project'}/${id}`, newObject)
//   return request.then(response => response.data)
// }

export default { getAllProjects,getAllGrouppages, createProject, createGrouppage, deleteProject, deleteGrouppage }