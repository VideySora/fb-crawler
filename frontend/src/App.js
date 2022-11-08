import { useState, useEffect } from 'react'
import fakeAPI from './services/fakeapi'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom"
const Home = () => (
  <>
    <br/>
    <hr/>
  </>
)

const Create = ({ projects, setProjects, newProject, setNewProject }) => {
  const addProject = (event) => {
    event.preventDefault()
    const projectObject = {
      name: newProject
    }
    fakeAPI
      .createProject(projectObject)
      .then(returnedProject => {
        setProjects(projects.concat(returnedProject))
        setNewProject('')
      })
  }
  const handleProjectChange = (event) => {
    setNewProject(event.target.value)
  }
  return (
    <>
      <br/>
      <hr/>
      <form onSubmit={addProject}>
        <input
          value={newProject}
          onChange={handleProjectChange}
        />
        <button type="submit">save</button>
      </form>
    </>
  )
}
const Projects = ({ projects, setProjects, grouppages, setGrouppages }) => {
  function handleDeleteProject(deleteID) {
    fakeAPI.deleteProject(deleteID)
      .then(() => {
        setProjects(projects.filter(pro => pro.id !== deleteID))
      })
    // let deleteGP = grouppages.filter(gp => gp.projectid == deleteID)
    // deleteGP.forEach(gp => {
    //   let temp = gp.id;
    //   fakeAPI.deleteGrouppage(temp)
    //     .then(() => {
    //       setGrouppages(grouppages.filter(gp => gp.id !== temp))
    //     })
    // })
  }
  return (
    <>
      <Link to="/projects">
          Projects
      </Link>
      <hr/>
      {projects.map(pro => (
        <div key={pro.id}>
          <button onClick={()=>handleDeleteProject(pro.id)}>Delete</button>
          <span key={pro.id}>
            <Link to={`/projects/${pro.id}`}>{pro.name}</Link>
          </span><br/>
        </div>
      )
      )
      }
    </>
  )
}
const Project = ({ projects, grouppages, setGrouppages, newGrouppage, setNewGrouppage }) => {
  function handleDeleteGrouppage(deleteID) {
    fakeAPI.deleteGrouppage(deleteID)
      .then(() => {
        setGrouppages(grouppages.filter(gp => gp.id !== deleteID))
      })
  }
  let id = useParams().id;
  const containerProject = projects.find(pro => pro.id == id)
  const grouppageArray = grouppages.filter(gp => gp.projectid == id)
  const addGrouppage = (event) => {
    event.preventDefault()
    const grouppageObject= {
      gplink: newGrouppage,
      projectid: id
    }
    fakeAPI
      .createGrouppage(grouppageObject)
      .then(returnedGrouppage => {
        setGrouppages(grouppages.concat(returnedGrouppage))
        setNewGrouppage('')
      })
  }
  const handleGrouppageChange = (event) => {
    setNewGrouppage(event.target.value)
  }
  return (
    <>
        <Link to="/projects">
          Projects
        </Link>
        <span>&#32;&#62;&#32;</span>
        <Link to={`/projects/${containerProject.id}`}>
          {containerProject.name}
        </Link>
      <hr/>
      {grouppageArray.map(gp =>
      <div key={gp.id}>
        <button onClick={()=>handleDeleteGrouppage(gp.id)}>Delete</button>
        <span>
          <Link to={`/projects/${containerProject.id}/grouppages/${gp.id}`}>{gp.gplink}</Link>
        </span><br/>
      </div>)}
    <hr/>
    <form onSubmit={addGrouppage}>
    <input
      value={newGrouppage}
      onChange={handleGrouppageChange}
    />
    <button type="submit">save</button>
  </form>
    </>
  )
}
const Grouppage = ({ projects, grouppages }) => {
  let pid = useParams().pid;
  let gid = useParams().gid;
  return (
    <>
        <Link to="/projects">
          Projects
        </Link>
        <span>&#32;&#62;&#32;</span>
        <Link to={`/projects/${pid}`}>
          {projects.find(pro => pro.id=pid).name}
        </Link>
        <span>&#32;&#62;&#32;</span>
        <Link to={`/projects/${pid}/grouppages/${gid}`}>
          {grouppages.find(gp => gp.id=gid).gplink}
        </Link>
        <hr/>
        <p>Đây là trang sẽ quét data của anh Thiện về</p>
    </>
  )
}
const padding = {
  padding: 5
}
const App = () => {
  const [projects, setProjects] = useState([])
  const [newProject, setNewProject] = useState('')
  const [grouppages, setGrouppages] = useState([])
  const [newGrouppage, setNewGrouppage] = useState('')

  useEffect(() => {
    fakeAPI
      .getAllProjects()
      .then(initialProjects => {
        setProjects(initialProjects)
      })
  }, [])
  useEffect(() => {
    fakeAPI
      .getAllGrouppages()
      .then(initialGrouppages => {
        setGrouppages(initialGrouppages)
      })
  }, [])

  return (
    <BrowserRouter>
      <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/projects">projects</Link>
          <Link style={padding} to="/projects/create">create</Link>
        </div>

        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/create" element={<Create
                                                projects={projects}
                                                setProjects={setProjects}
                                                newProject={newProject}
                                                setNewProject={setNewProject} />} />
        <Route path="/projects" element={<Projects
                                                projects={projects}
                                                setProjects={setProjects}
                                                grouppages={grouppages}
                                                setGrouppages={setGrouppages}/>} />
        <Route path="/projects/:id" element={<Project
                                                projects={projects}
                                                grouppages={grouppages}
                                                setGrouppages={setGrouppages}
                                                newGrouppage={newGrouppage}
                                                setNewGrouppage={setNewGrouppage} />} />
        <Route path="/projects/:pid/grouppages/:gid" element={<Grouppage
                                                projects={projects}
                                                grouppages={grouppages} />} />                                        
          
    
      </Routes>
    </BrowserRouter>
  )
}

export default App