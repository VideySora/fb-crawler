import React from 'react';
import { Link, useParams } from 'react-router-dom';
import "./table.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import "../../utilites/button.scss"

function LinkTable({ projects, grouppages, setGrouppages, deleteGrouppage }) {
  let id = useParams().pid;
  const profound = projects.find(pro => pro._id == id)
  const gpfound = grouppages.filter(gp => gp.project == id)
  function handleDeleteGrouppage(event, deleteID) {
    event.preventDefault();
    deleteGrouppage(deleteID)
      .then(nullreturn => {
        setGrouppages(grouppages.filter(gp => gp._id !== deleteID))
      })
  }
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='left' className='head-col'>Link</TableCell>
            <TableCell align="right" className='head-col'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {grouppages.filter(gpp => (gpp.project._id === id)).map((gp) => (
            <TableRow
              key={gp._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {gp.name}
              </TableCell>
              <TableCell align="right" color='yellow'>
                <Link to={`/projects/${id}/grouppages/${gp._id}`}><button className='button view'>View</button></Link>
                <button className='button delete' onClick={(event) => handleDeleteGrouppage(event, gp._id)}>Delete</button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LinkTable