import React from "react";
import { Link, useParams } from "react-router-dom";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

import "../../utilites/button.scss";
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
      />
    </GridToolbarContainer>
  );
}
function BaiTable({ baiposts, grouppages }) {
  let gid = useParams().gid;
  let pid = useParams().pid;
  const gpfound = grouppages.find(gp => gp._id == gid)
  const rows = [];
  baiposts
    .filter((bpp) => bpp.grouppage._id === gid)
    .forEach(function (bp) {
      let newRow = {
        id: bp._id,
        groupname: gpfound.name,
        username: bp.username,
        group_id: gpfound.group_id,
        post_id: bp.post_id,
        user_id: bp.user_id,
        time: bp.time,
        likes: bp.likes,
        comments: bp.comments,
        shares: bp.shares,
        action: bp._id,
      };
      rows.push(newRow);
    });
  const columns = [
    { field: "groupname", headerName: "Group Name", width: 200 },
    { field: "username", headerName: "User Name", width: 150 },
    { field: "group_id", headerName: "Group ID", width: 150 },
    { field: "post_id", headerName: "Post ID", width: 150 },
    { field: "user_id", headerName: "User ID", width: 150 },
    { field: "time", headerName: "Time", width: 150 },
    { field: "likes", headerName: "Likes", width: 80 },
    { field: "comments", headerName: "Comments", width: 80 },
    { field: "shares", headerName: "Shares", width: 80 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      disableExport: true,
      renderCell: (cellValues) => (
        <Link to={`/projects/${pid}/grouppages/${gid}/baiposts/${cellValues.row.id}`}>
          <button className="button view">View</button>
        </Link>
      ),
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar}}
        />
      </div>
      {/* <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" className="head-col">
              Post ID
            </TableCell>
            <TableCell align="left" className="head-col">
              User name
            </TableCell>
            <TableCell align="left" className="head-col">
              Time
            </TableCell>
            <TableCell align="left" className="head-col">
              Likes
            </TableCell>
            <TableCell align="left" className="head-col">
              Comments
            </TableCell>
            <TableCell align="left" className="head-col">
              Shares
            </TableCell>
            <TableCell align="left" className="head-col">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {baiposts
            .filter((bpp) => bpp.grouppage._id === gid)
            .map((bp) => (
              <TableRow
                key={bp._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="td" scope="row">
                  {bp.post_id}
                </TableCell>
                <TableCell component="td" scope="row">
                  {bp.username}
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
                <TableCell align="right" color="yellow">
                  <Link
                    to={`/projects/${pid}/grouppages/${gid}/baiposts/${bp._id}`}
                  >
                    <button className="button view">View</button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table> */}
    </TableContainer>
  );
}

export default BaiTable;
