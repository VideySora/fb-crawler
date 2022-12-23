import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./project.scss";
import "../../utilites/divider.scss";
import "../../utilites/button.scss";
import LinkTable from "../../components/Table/LinkTable";
import InputLink from "../../components/InputLinks/InputLink";
import "../../utilites/page.scss"


function Project({
  projects,
  grouppages,
  setGrouppages,
  newGrouppage,
  setNewGrouppage,
  createGrouppage,
  deleteGrouppage,
  createBaipost,
  baiposts,
  setBaiposts,
  file,
  setFile,
  setUser,
  setToken,
  setProjects,
  loader,
  setLoader,
}) {
  return (
    <div className="project-page page">
      <Sidebar
        setUser={setUser}
        setToken={setToken}
        setProjects={setProjects}
        setGrouppages={setGrouppages}
        setBaiposts={setBaiposts}
      />
      <div className="project-page-container content-container">
        <Navbar
          projects={projects}
          grouppages={grouppages}
          baiposts={baiposts}
        />
        <span className="divider">
          <hr />
        </span>
        <div className="content-container-body">
          <div className="inputLinks-container widget">
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
              setFile={setFile}
              loader={loader}
              setLoader={setLoader}
            />
          </div>
          <div className="list-container widget">
            
            <LinkTable
              className="link-table"
              projects={projects}
              grouppages={grouppages}
              setGrouppages={setGrouppages}
              deleteGrouppage={deleteGrouppage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
