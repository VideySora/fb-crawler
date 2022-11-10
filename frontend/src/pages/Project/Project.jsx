import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import "./project.scss"
import "../../utilites/divider.scss"
import "../../utilites/button.scss"
import LinkTable from '../../components/Table/LinkTable'
import InputLink from '../../components/InputLinks/InputLink'
import {Link, useParams} from "react-router-dom"
function Project({ projects, grouppages, setGrouppages, newGrouppage, setNewGrouppage, createGrouppage, deleteGrouppage }) {
  let id = useParams().pid;
  const profound = projects.find(pro => pro.id == id)
  const gpfound = grouppages.filter(gp => gp.projectid == id)
  console.log('number is', id);
  console.log("gpfound is", gpfound)
  console.log('profound is', profound)
  return (
    <div className="project-page">
      <Sidebar/>
      <div className="project-page-container">
        <Navbar/>
        <span className='divider'><hr /></span>
        <div className="content-container">
          <div className='inputLinks-container widget'>
            <InputLink
                    grouppages={grouppages}
                    setGrouppages={setGrouppages}
                    newGrouppage={newGrouppage}
                    setNewGrouppage={setNewGrouppage}
                    createGrouppage={createGrouppage}/>
          </div>
          <div className="list-container widget">
            <LinkTable className="link-table"
                                          grouppages={grouppages}
                                          setGrouppages={setGrouppages}  
                                          profound={profound}
                                          gpfound={gpfound}
                                          deleteGrouppage={deleteGrouppage}/>
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project