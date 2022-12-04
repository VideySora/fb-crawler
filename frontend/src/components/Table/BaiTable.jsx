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

function BaiTable({ baiposts }) {
  let gid = useParams().gid;
  let pid = useParams().pid;
  // const profound = projects.find(pro => pro._id == id)
  // const gpfound = grouppages.filter(gp => gp.project == id)
  
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='left' className='head-col'>Post ID</TableCell>
            <TableCell align='left' className='head-col'>User name</TableCell>
            <TableCell align='left' className='head-col'>Content</TableCell>
            <TableCell align='left' className='head-col'>Time</TableCell>
            <TableCell align='left' className='head-col'>Likes</TableCell>
            <TableCell align='left' className='head-col'>Comments</TableCell>
            <TableCell align='left' className='head-col'>Shares</TableCell>
            <TableCell align='left' className='head-col'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {baiposts.filter(bpp => (bpp.grouppage._id === gid)).map((bp) => (
            <TableRow
              key={bp._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="td" scope="row">
                {bp.post_id}
              </TableCell>
              <TableCell component="td" scope="row">
                {bp.username}
              </TableCell>
              <TableCell component="td" scope="row">
                {bp.text}
              </TableCell>
              <TableCell component="td" scope="row">
                {bp.time}
              </TableCell>
              <TableCell component="td" scope="row">
                {bp.likes}
              </TableCell>
              <TableCell component="td" scope="row">
                {bp.comments}
              </TableCell>
              <TableCell component="td" scope="row">
                {bp.shares}
              </TableCell>
              <TableCell align="right" color='yellow'>
                <Link to={`/projects/${pid}/grouppages/${gid}/baiposts/${bp._id}`}><button className='button view'>View</button></Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BaiTable