import React from 'react'
import "./breadcrumb.scss"
import { useParams, Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const routes = [
    { path: "projects/:projectId", breadcrumb: ">> Project " },
    { path: "projects/:projectId/grouppages/:linkId", breadcrumb: ">> GroupPage " },
    { path: "/projects", breadcrumb: ">> Projects " },
]

function Breadcrumb({ projects, grouppages, baiposts }) {
    let pid = useParams().pid;
    let gid = useParams().gid;
    let bid = useParams().bid;
    if (bid != null) {
        const baipostID = baiposts.find(bp => bp._id == bid).post_id;
        const grouppageName = grouppages.find(gp => gp._id == gid).name;
        const projectName = projects.find(pro => pro._id == pid).name;
        return (
            <div className='breadcrumb-container'>
                <Stack spacing={2}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link to="/projects" className="crumb">
                            <div className="crumb-text">
                            Home

                            </div>
                        </Link>
                        <Link to={`/projects/${pid}`} className="crumb">
                            <div className="crumb-text">
                            Project: {projectName}
                            </div>
                        </Link>
                        <Link to={`/projects/${pid}/grouppages/${gid}`} className="crumb">
                            <div className="crumb-text">
                            Group: {grouppageName}
                            </div>
                        </Link>
                        <Link to={`/projects/${pid}/grouppages/${gid}/baiposts/${bid}`} className="crumb">
                            <div className="crumb-text">
                            Post ID: {baipostID}

                            </div>
                        </Link>
                    </Breadcrumbs>
                </Stack>
            </div>
        )
    }
    else if (gid != null) {
        const grouppageName = grouppages.find(gp => gp._id == gid).name;
        const projectName = projects.find(pro => pro._id == pid).name;
        return (
            <div className='breadcrumb-container'>
                <Stack spacing={2}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link to="/projects" className="crumb">
                            Home
                        </Link>
                        <Link to={`/projects/${pid}`} className="crumb">
                            Project: {projectName}
                        </Link>
                        <Link to={`/projects/${pid}/grouppages/${gid}`} className="crumb">
                            Group: {grouppageName}
                        </Link>
                    </Breadcrumbs>
                </Stack>
            </div>
        )
    }
    else if (pid != null) {
        const projectName = projects.find(pro => pro._id == pid).name;
        return (
            <div className='breadcrumb-container'>
                <Stack spacing={2}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link to="/projects" className="crumb">
                            Home
                        </Link>
                        <Link to={`/projects/${pid}`} className="crumb">
                            Project: {projectName}
                        </Link>
                    </Breadcrumbs>
                </Stack>
            </div>
        )
    }
    else {
        return (
            <div className='breadcrumb-container'>
                <Stack spacing={2}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link to="/projects" className="crumb">
                            Home
                        </Link>
                    </Breadcrumbs>
                </Stack>
            </div>
        )
    }
    return (
        <div className='breadcrumb-container'>
            <Stack spacing={2}>
                <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
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