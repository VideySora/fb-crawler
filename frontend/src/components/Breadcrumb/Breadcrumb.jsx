import React from 'react'
import "./breadcrumb.scss"
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink } from 'react-router-dom';

const routes = [
    { path: "projects/:projectId", breadcrumb: ">> Project " },
    { path: "projects/:projectId/grouppages/:linkId", breadcrumb: ">> GroupPage " },
    { path: "/projects", breadcrumb: ">> Projects " },
]

function Breadcrumb() {
    const breadcrumbs = useBreadcrumbs(routes, 
                                       { excludePaths: ["/","/projects/:projectId/grouppages"],}, 
                                       { disableDefaults: true }

    );

    return (
        <div className='breadcrumb-container'>
            {breadcrumbs.map(({ match, breadcrumb }) => (
                <NavLink key={match.pathname} to={match.pathname} className = "crumb">
                    {breadcrumb}
                </NavLink>
            ))}
        </div>
    )
}

export default Breadcrumb