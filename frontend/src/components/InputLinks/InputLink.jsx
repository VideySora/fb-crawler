import React, { useEffect } from 'react'
import {Link, useParams} from "react-router-dom"

function addLink(){}
function newLinks(){}
function handleLinkChange(){}

function InputLink({grouppages, setGrouppages, newGrouppage, setNewGrouppage, createGrouppage}) {
  let pid = useParams().pid;
  useEffect(() => {
    console.log("in effect: ", grouppages.length);
  },[grouppages])
  const addGrouppage = (event) => {
    event.preventDefault()
    const newGPObject= {
      link: newGrouppage
    }
    createGrouppage({pid, newGPObject})
      .then(returnedGrouppage => {
        // returnedGrouppage.project = returnedGrouppage.project._id;
        setGrouppages(
          grouppages.concat(returnedGrouppage)
        )
        setNewGrouppage('')
      })
  }
  const handleGrouppageChange = (event) => {
    setNewGrouppage(event.target.value)
  }
  return (
    <>
    <form onSubmit={addGrouppage} className="inputLink-form">
      <div className="left">
        <div className="top create-label"><label htmlFor="createProject">Input Links</label></div>
        <div className="bottom create-submit">
          <input
            name="inputlink"
            id="inputlink"
            type="text"
            placeholder="Enter your links here"
            value={newGrouppage}
            onChange={handleGrouppageChange}
          />
        </div>
      </div>

      <div className="center">
      <div className="top create-label"><label htmlFor="createProject">Scrolls</label></div>
        
      </div>

      <div className="right">
        <button type="submit" className="button">Create</button>
      </div>
    </form>
  </>
  )
}

export default InputLink