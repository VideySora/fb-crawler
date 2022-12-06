import React from 'react'
import "./breadcrumb.scss"
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const routes = [
    { path: "projects/:projectId", breadcrumb: ">> Project " },
    { path: "projects/:projectId/grouppages/:linkId", breadcrumb: ">> GroupPage " },
    { path: "/projects", breadcrumb: ">> Projects " },
]

function Breadcrumb() {
    let pid = useParams().pid;
    let gid = useParams().gid;
    let bid = useParams().bid;
    if(bid!=null){
        console.log("bid is: ", bid);
    }
    else if(gid!=null){
        console.log("gid is: ", gid);
    }
    else if(pid!=null){
        console.log("pid is: ", pid);
    }
    return (
        <div className='breadcrumb-container'>
            <Stack spacing={2}>
            <Breadcrumbs aria-label="breadcrumb"  separator={<NavigateNextIcon fontSize="small" />}>
                <Link underline="hover" color="inherit" href="/" className="crumb">
                    MUI
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                    className="crumb"
                >
                    Core
                </Link>
                <Typography color="text.primary" className="crumb">Breadcrumbs</Typography>
            </Breadcrumbs>
            </Stack>
        </div>
    )
}

export default Breadcrumb