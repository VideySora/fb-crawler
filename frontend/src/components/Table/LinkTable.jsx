import React from 'react';
import { Link } from 'react-router-dom';
import "./table.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import "../../utilites/button.scss"

function LinkTable({ grouppages, setGrouppages, profound, gpfound, deleteGrouppage }) {
  function handleDeleteGrouppage(deleteID) {
    deleteGrouppage(deleteID)
        .then(nullreturn => {
            setGrouppages(grouppages.filter(gp => gp.id !== deleteID))
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
          {gpfound.map((gp) => (
            <TableRow
              key={gp.id.toString()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={`/projects/${profound.id}/grouppages/${gp.id}`}>{gp.gplink}</Link>
              </TableCell>
              <TableCell align="right" color='yellow'>
                <button className='button delete'>
                  View
                </button>
                <button className='button delete' onClick={() => handleDeleteGrouppage(gp.id)}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LinkTable