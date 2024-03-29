import React from 'react';
import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom"
// import {
//   DataGrid,
//   GridRowsProp,
//   GridColDef,
//   GridToolbar,
//   GridToolbarContainer,
//   GridToolbarExport,
// } from "@mui/x-data-grid";

import "../../utilites/button.scss"

function ProjectsTable({ projects, setProjects, newProject, setNewProject, grouppages, setGrouppages, createProject, deleteProject }) {
  function handleDeleteProject(e, deleteID) {
    e.preventDefault();
    deleteProject(deleteID)
      .then(nullreturn => {
        setProjects(projects.filter(pro => pro._id !== deleteID))
        setGrouppages(grouppages.filter(gp => gp.project._id !== deleteID))
      })
  }
  
  // const rows = [];

  // const columns = [
  //   {field: ""}
  // ]

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='left' className='head-col'>Project</TableCell>
            <TableCell align="center" className='head-col'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((pro) => (
            <TableRow
              key={pro._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" color='red'>
                {pro.name}
              </TableCell>
              <TableCell align="center" color='yellow'>
                <Link to={`/projects/${pro._id}`}><button className='button view'>View</button></Link>
                <button className='button delete' onClick={(e) => handleDeleteProject(e, pro._id)}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProjectsTable 