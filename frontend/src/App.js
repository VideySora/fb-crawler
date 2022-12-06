import { useState, useEffect } from "react";
import axios from "axios";
//import fakeAPI from 'services/fakeapi'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useParams,
  userNavigate
} from "react-router-dom";
import Single from "./pages/Single/Single";
// import Links from "./pages/Links/Links";
import Project from "./pages/Project/Project";
import Bai from "./pages/Bai/Bai";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Signup from "./pages/Login/Signup";

/////////////////////////////////////////////////////////////////////
let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const loginService = async credentials => {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

const signupService = async credentials => {
  const response = await axios.post('/api/signup', credentials)
  return response.data
}
const getAllProjects = async (uid) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(`/api/projects/${uid}`, config);
  return request.then((response) => response.data);
};

const createProject = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post("/api/projects", newObject, config);
  return request.then((response) => response.data);
};

const getAllGrouppages = async () => {
  const request = axios.get("/api/grouppages");
  return request.then((response) => response.data);
};
const createGrouppage = async ({ pid, newGPObject }) => {
  const request = axios.post(`/api/projects/${pid}`, newGPObject);
  return request.then((response) => response.data);
};
const deleteProject = async (pid) => {
  const request = axios.delete(`/api/projects/${pid}`);
  return request.then((response) => response.data);
};
const deleteGrouppage = async (gid) => {
  const request = axios.delete(`/api/grouppages/${gid}`);
  return request.then((response) => response.data);
};
const getAllBaiposts = async () => {
  const request = axios.get("/api/baiposts");
  return request.then((response) => response.data);
};
const createBaipost = async ({ gid, newBPObject }) => {
  const request = axios.post(`/api/grouppages/${gid}`, newBPObject);
  return request.then((response) => response.data);
};
/////////////////////////////////////////////////////////////////////
function App() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [grouppages, setGrouppages] = useState([]);
  const [newGrouppage, setNewGrouppage] = useState("");
  const [baiposts, setBaiposts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  
  useEffect(() => {
    if (user != null) {
      getAllProjects(user.user._id).then((allProjects) => {
        setProjects(allProjects);
      });
      getAllGrouppages().then((initialGrouppages) => {
        setGrouppages(initialGrouppages);
      });
      getAllBaiposts().then((initialBaipost) => {
        setBaiposts(initialBaipost);
      });
      }
    }, [user])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])
  // useEffect(() => {
  //   if (user !== null) {
  //     console.log("projects are: ", projects)
  //     console.log("user is: ", user)
  //     // console.log("project[0] is: ", typeof(projects[0].user.username))
  //     let filteredProjects = projects.filter(pro => pro.user.username === user.username)
  //     console.log("filteredProjects are : ", filteredProjects)
  //     setProjects(filteredProjects)
  //   }
  // },[user])
  return (
    <div className="App">
      <BrowserRouter>
        {console.log("user is: ", user)}
        <Routes>
          <Route path="/">
            <Route index element={user != null ? <Navigate to="/projects" /> : <Navigate to="/login" />} />
            <Route
              path="login"
              element={
                <Login
                  setToken={setToken}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  user={user}
                  setUser={setUser}
                  loginService={loginService}
                />
              }
            ></Route>
            <Route path="signup" element={<Signup 
                                            username={username}
                                            setUsername={setUsername}
                                            password={password}
                                            setPassword={setPassword}
                                            signupService={signupService}
                                            errorMessage={errorMessage}
                                            setErrorMessage={setErrorMessage} />}></Route>
            <Route
              path="projects"
              element={
                <Home
                  projects={projects}
                  setProjects={setProjects}
                  newProject={newProject}
                  setNewProject={setNewProject}
                  grouppages={grouppages}
                  setGrouppages={setGrouppages}
                  deleteProject={deleteProject}
                  createProject={createProject}
                  setUser={setUser}
                  setToken={setToken}
                  setBaiposts={setBaiposts}/>
              }
            ></Route>
            <Route path="projects/:pid/">
              {console.log("baiposts at App are: ", baiposts)}
              <Route
                index
                element={
                  <Project
                    projects={projects}
                    grouppages={grouppages}
                    setGrouppages={setGrouppages}
                    newGrouppage={newGrouppage}
                    setNewGrouppage={setNewGrouppage}
                    createGrouppage={createGrouppage}
                    deleteGrouppage={deleteGrouppage}
                    createBaipost={createBaipost}
                    baiposts={baiposts}
                    setBaiposts={setBaiposts}
                    file={file}
                    setFile={setFile}
                    setUser={setUser}
                    setToken={setToken}
                    setProjects={setProjects}
                  />
                }
              ></Route>
              <Route path="grouppages/:gid">
                <Route index element={<Single baiposts={baiposts} setUser={setUser} setToken={setToken} setProjects={setProjects} setGrouppages={setGrouppages} setBaiposts={setBaiposts} />}></Route>
                <Route path="baiposts/:bid" element={<Bai baiposts={baiposts} setUser={setUser} setToken={setToken} setProjects={setProjects} setGrouppages={setGrouppages} setBaiposts={setBaiposts} />}></Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
