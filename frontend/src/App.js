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


// const Projects = ({ projects, setProjects, grouppages, setGrouppages }) => {
//   function handleDeleteProject(deleteID) {
//     fakeAPI.deleteProject(deleteID)
//       .then(() => {
//         setProjects(projects.filter(pro => pro.id !== deleteID))
//       })
//     // let deleteGP = grouppages.filter(gp => gp.projectid == deleteID)
//     // deleteGP.forEach(gp => {
//     //   let temp = gp.id;
//     //   fakeAPI.deleteGrouppage(temp)
//     //     .then(() => {
//     //       setGrouppages(grouppages.filter(gp => gp.id !== temp))
//     //     })
//     // })
//   }
//   return (
//     <>
//       <Link to="/projects">
//           Projects
//       </Link>
//       <hr/>
//       {projects.map(pro => (
//         <div key={pro.id}>
//           <button onClick={()=>handleDeleteProject(pro.id)}>Delete</button>
//           <span key={pro.id}>
//             <Link to={`/projects/${pro.id}`}>{pro.name}</Link>
//           </span><br/>
//         </div>
//       )
//       )
//       }
//     </>
//   )
// }
// const Project = ({ projects, grouppages, setGrouppages, newGrouppage, setNewGrouppage }) => {
//   function handleDeleteGrouppage(deleteID) {
//     fakeAPI.deleteGrouppage(deleteID)
//       .then(() => {
//         setGrouppages(grouppages.filter(gp => gp.id !== deleteID))
//       })
//   }
//   let id = useParams().id;
//   const containerProject = projects.find(pro => pro.id == id)
//   const grouppageArray = grouppages.filter(gp => gp.projectid == id)
//   const addGrouppage = (event) => {
//     event.preventDefault()
//     const grouppageObject= {
//       gplink: newGrouppage,
//       projectid: id
//     }
//     fakeAPI
//       .createGrouppage(grouppageObject)
//       .then(returnedGrouppage => {
//         setGrouppages(grouppages.concat(returnedGrouppage))
//         setNewGrouppage('')
//       })
//   }
//   const handleGrouppageChange = (event) => {
//     setNewGrouppage(event.target.value)
//   }
//   return (
//     <>
//         <Link to="/projects">
//           Projects
//         </Link>
//         <span>&#32;&#62;&#32;</span>
//         <Link to={`/projects/${containerProject.id}`}>
//           {containerProject.name}
//         </Link>
//       <hr/>
//       {grouppageArray.map(gp =>
//       <div key={gp.id}>
//         <button onClick={()=>handleDeleteGrouppage(gp.id)}>Delete</button>
//         <span>
//           <Link to={`/projects/${containerProject.id}/grouppages/${gp.id}`}>{gp.gplink}</Link>
//         </span><br/>
//       </div>)}
//     <hr/>
//     <form onSubmit={addGrouppage}>
//     <input
//       value={newGrouppage}
//       onChange={handleGrouppageChange}
//     />
//     <button type="submit">save</button>
//   </form>
//     </>
//   )
// }
// const Grouppage = ({ projects, grouppages }) => {
//   let pid = useParams().pid;
//   let gid = useParams().gid;
//   return (
//     <>
//         <Link to="/projects">
//           Projects
//         </Link>
//         <span>&#32;&#62;&#32;</span>
//         <Link to={`/projects/${pid}`}>
//           {projects.find(pro => pro.id=pid).name}
//         </Link>
//         <span>&#32;&#62;&#32;</span>
//         <Link to={`/projects/${pid}/grouppages/${gid}`}>
//           {grouppages.find(gp => gp.id=gid).gplink}
//         </Link>
//         <hr/>
//         <p>Đây là trang sẽ quét data của anh Thiện về</p>
//     </>
//   )
// }
// const padding = {
//   padding: 5
// }
/////////////////////////////////////////////////////////////////////

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
