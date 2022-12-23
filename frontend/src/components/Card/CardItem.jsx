import React from 'react'
import { Card, CardContent, List, ListItem } from '@mui/material';

function CardItem({ project, projects,setProjects, newProject, setNewProject, grouppages, setGrouppages, createProject, deleteProject }) {
    function handleDeleteProject(e, deleteID) {
        e.preventDefault();
        deleteProject(deleteID)
          .then(nullreturn => {
            setProjects(projects.filter(pro => pro._id !== deleteID))
            setGrouppages(grouppages.filter(gp => gp.project._id !== deleteID))
          })
    }

    return (
        <Card>
            <CardContent>
                <List>
                    <ListItem></ListItem>
                </List>
            </CardContent>
        </Card>
    )
}

export default CardItem