import "./create.scss";
import "../../utilites/button.scss"

const Create = ({ projects, setProjects, newProject, setNewProject, createProject }) => {
  const addProject = (event) => {
    event.preventDefault()
    const projectObject = {
      name: newProject
    }

    createProject(projectObject)
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
      <form onSubmit={addProject} className="create-form">
        <div className="left">
          <div className="top create-label"><label htmlFor="createProject">New Project</label></div>
          <div className="bottom create-submit">
            <input
              name="createProject"
              type="text"
              placeholder="Your project Name"
              value={newProject}
              onChange={handleProjectChange}
            />
          </div>
        </div>

        <div className="right">
          <button type="submit" className="button">Create</button>
        </div>
      </form>
    </>
  )
}

export default Create