import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import "./project.scss"
import "../../utilites/divider.scss"
import "../../utilites/button.scss"
import LinkTable from '../../components/Table/LinkTable'
import InputLink from '../../components/InputLinks/InputLink'
function Project({ projects, grouppages, setGrouppages, newGrouppage, setNewGrouppage, createGrouppage, deleteGrouppage,createBaipost,baiposts, setBaiposts, file, setFile }) {
  
  return (
    <div className="project-page">
      {console.log("baiposts at Project are: ", baiposts)}
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
                    createGrouppage={createGrouppage}
                    createBaipost={createBaipost}
                    baiposts={baiposts}
                    setBaiposts={setBaiposts}
                    file={file}
                    setFile={setFile} />
          </div>
          <div className="list-container widget">
            <LinkTable className="link-table"
                                          projects={projects}
                                          grouppages={grouppages}
                                          setGrouppages={setGrouppages}  
                                          deleteGrouppage={deleteGrouppage}/>
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project