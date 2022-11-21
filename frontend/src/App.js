import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
//import fakeAPI from 'services/fakeapi'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useParams,
} from "react-router-dom";
import Single from "./pages/Single/Single";
// import Links from "./pages/Links/Links";
import Project from "./pages/Project/Project";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Signup from "./pages/Login/Signup";



/////////////////////////////////////////////////////////////////////

const getAllProjects = async () => {
  const request = axios.get('/api/projects')
  return request.then(response => response.data)
}

const createProject = async newObject => {
  const request = axios.post('/api/projects', newObject)
  return request.then(response => response.data)
}

const getAllGrouppages = async () => {
  const request = axios.get('/api/grouppages')
  return request.then(response => response.data)
}
const createGrouppage = async ({pid, newGPObject}) => {
  const request = axios.post(`/api/projects/${pid}`, newGPObject)
  return request.then(response => response.data)
}
const deleteProject = async (pid) => {
  const request =  axios.delete(`/api/projects/${pid}`)
  return request.then(response => response.data)
}
const deleteGrouppage = async (gid) => {
  const request =  axios.delete(`/api/grouppages/${gid}`)
  return request.then(response => response.data)
}
/////////////////////////////////////////////////////////////////////
function App() {
  const [projects, setProjects] = useState([])
  const [newProject, setNewProject] = useState('')
  const [grouppages, setGrouppages] = useState([])
  const [newGrouppage, setNewGrouppage] = useState('')

  useEffect(() => {
    getAllProjects()
      .then(initialProjects => {
        setProjects(initialProjects)
      })
  }, [])
  useEffect(() => {
    getAllGrouppages()
      .then(initialGrouppages => {
        setGrouppages(initialGrouppages)
      })
  }, [])
  return (
    <div className="App">
    { console.log("all projects: ", projects) }
    { console.log("all grouppages: ", grouppages) }
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to = "/login"/>}/>
            <Route path="login" element={<Login/>}></Route>
            <Route path="signup" element={<Signup/>}></Route>
            <Route path="projects" element={<Home
                                                projects={projects}
                                                setProjects={setProjects}
                                                newProject={newProject}
                                                setNewProject={setNewProject}
                                                grouppages={grouppages}
                                                setGrouppages={setGrouppages}
                                                deleteProject={deleteProject}
                                                createProject={createProject}
                                                deleteGrouppage={deleteGrouppage}/>}></Route>
            <Route path="projects/:pid/">
              <Route index element={<Project
                                          projects={projects}
                                          grouppages={grouppages}
                                          setGrouppages={setGrouppages}
                                          newGrouppage={newGrouppage}
                                          setNewGrouppage={setNewGrouppage}
                                          createGrouppage={createGrouppage}
                                          deleteGrouppage={deleteGrouppage}/>}></Route>
              <Route path="grouppages/:gid" element={<Single
                                                              projects={projects}
                                                              grouppages={grouppages}/>}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
