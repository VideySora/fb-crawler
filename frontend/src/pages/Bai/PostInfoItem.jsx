import React from 'react'
import { Typography, ListItem } from '@mui/material'

const titleStyle = {
    fontFamily: "Inherit",
    fontSize: "18px",
    color: "#0057B7"
}

const contentStyle = {
    fontFamily: "Inherit",
    fontSize: "18px",
    color: "#000000"
}

function PostInfoItem({ title, content, button = undefined, link = undefined }) {
    return (
        <ListItem>
            {!title ? <Typography sx={titleStyle}><b>&ensp; &ensp; &ensp;</b></Typography>:<Typography sx={titleStyle}><b>{title} : &ensp;</b></Typography>}
            {!link ? (<Typography sx={contentStyle}>{" " + content}</Typography>) :
                <a href={link} target={"_blank"} style={{all:"unset", cursor:"pointer"}}><Typography sx={contentStyle}>{" " + content}</Typography></a>}
            {button ? button : ''}
        </ListItem>
    )
}

export default PostInfoItem