import React from 'react';
import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from "react-router-dom"

import "../../utilites/button.scss"

function ProjectsTable({ projects, setProjects, newProject, setNewProject, grouppages, setGrouppages, createProject, deleteProject }) {
  function handleDeleteProject(deleteID) {
    deleteProject(deleteID)
        .then(nullreturn => {
            setProjects(projects.filter(pro => pro.id !== deleteID))
        })
  }

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='left' className='head-col'>Project</TableCell>
            <TableCell align="left" className='head-col'>Description</TableCell>
            <TableCell align="cnter" className='head-col'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((pro) => (
            <TableRow
              key={pro.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" color='red'>
                {console.log('typeof pro.id at projecttable: ', typeof (pro.id))}
                <Link to={`/projects/${pro.id}`}>{pro.name}</Link>
              </TableCell>
              <TableCell align="left" color='green'>abc</TableCell>
              <TableCell align="center" color='yellow'>
                <button className='button view'>View</button>
                <button onClick={()=>handleDeleteProject(pro.id)} className='button delete'>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProjectsTable 