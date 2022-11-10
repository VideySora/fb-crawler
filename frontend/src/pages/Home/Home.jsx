import React from 'react'
import "./home.scss"
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import ProjectsTable from '../../components/Table/ProjectTable'
import Create from '../../components/Create/Create'
import "../../utilites/widget.scss"

function Home({ projects, setProjects, newProject, setNewProject, grouppages, setGrouppages, deleteProject, createProject }) {
    return (
        <div className='projects-page'>
            <Sidebar />
            <div className="projects-page-container">
                <Navbar />
                <span className='divider'><hr /></span>
                <div className="content-container">
                    <div className="create-project-container widget">
                        <Create className="input-form"
                                                projects={projects}
                                                setProjects={setProjects}
                                                newProject={newProject}
                                                setNewProject={setNewProject}
                                                createProject={createProject}/>
                    </div>
                    <div className="list-container widget">
                        <ProjectsTable
                                    projects={projects}
                                    setProjects={setProjects}
                                    newProject={newProject}
                                    setNewProject={setNewProject}
                                    grouppages={grouppages}
                                    setGrouppages={setGrouppages}
                                    createProject={createProject}
                                    deleteProject={deleteProject} className = "project-table"/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home