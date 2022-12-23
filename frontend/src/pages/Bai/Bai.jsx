import React from 'react'
import "./bai.scss"
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import PostInfoItem from './PostInfoItem';
import "../../utilites/widget.scss"
import "../../utilites/page.scss"
import { List, Paper, Button, MobileStepper } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { Divider } from "@mui/material";

const imageWrapperStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px"
}

const videoWrapperStyle = imageWrapperStyle;

function Bai({ baiposts, setUser, setToken, setProjects, setGrouppages, setBaiposts, projects, grouppages }) {
    let bid = useParams().bid;
    // let groupName = baiposts[0].grouppage.name;
    let [index, setActiveStep] = useState(0);
    let onepost = baiposts.find(re => re._id == bid);
    const theme = useTheme();

    const goToNextPicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const goToPreviousPicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function image() {
        if (onepost.images_lowquality.length != 0) {
            return (
                <Paper sx={{ mx: 5, mt: 3, mb: 5, boxShadow: 3, borderRadius: "15px", width: "auto" }} elvevation="1" >
                        <List>
                            <PostInfoItem title="Images" content=""></PostInfoItem>
                        </List>
                    <div className="images-wrapper" style={imageWrapperStyle}>
                        <img
                            src={onepost.images_lowquality[index]}
                            style={{
                                height: "500px",
                                width: "100%",
                                maxWidth: 400,
                                display: "block",
                                overflow: "hidden",
                                maxHeight: "50%"
                            }}
                        />
                    </div>
                    <Divider></Divider>
                    <MobileStepper
                        variant="text"
                        sx={{ height: "50px", overflow: "hidden" }}
                        position="static"
                        index={index}
                        steps={onepost.images_lowquality.length}
                        nextButton={
                            <Button
                                size="small"
                                onClick={goToNextPicture}
                                disabled={index === onepost.images_lowquality.length - 1}
                            >
                                Next
                                {theme.direction !== "rtl" ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button
                                size="small"
                                onClick={goToPreviousPicture}
                                disabled={index === 0}
                            >
                                
                                {theme.direction !== "rtl" ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                                Previous
                            </Button>
                        }
                    ></MobileStepper>
                </Paper>
            )
        }else{
            return (
                <Paper sx={{ mx: 5, mt: 3, mb: 5, boxShadow: 3, borderRadius: "15px", width: "auto" }} elvevation="1" >
                        <List>
                            <PostInfoItem title="Images" content="None"></PostInfoItem>
                        </List>
                </Paper>
            )
        }
    }

    function video() {
        if (onepost.video != null) {
            return (
                <Paper sx={{ mx: 5, mb: 5, boxShadow: 3, borderRadius: "15px", width: "auto" }} elvevation="1" >
                    <List>
                        <PostInfoItem title="Video" content=""></PostInfoItem>
                        <div className="videoWrapperStyle" style={videoWrapperStyle}>
                            <video width="550" height="550" controls>
                                <source src={onepost.video} type="video/mp4"></source>
                            </video>
                        </div>
                    </List>
                </Paper>
            )
        }else{
            return (
                <Paper sx={{ mx: 5, mb: 5, boxShadow: 3, borderRadius: "15px", width: "auto" }} elvevation="1" >
                        <List>
                            <PostInfoItem title="Video" content="None"></PostInfoItem>
                        </List>
                </Paper>
            )
        }
    }

    return (
        <div className='single-group-page page'>
            <Sidebar setUser={setUser} setToken={setToken} setProjects={setProjects} setGrouppages={setGrouppages} setBaiposts={setBaiposts} />
            <div className="single-post-container content-container">
                <Navbar projects={projects} grouppages={grouppages} baiposts={baiposts} />
                <span className='divider'><hr /></span>
                <div className="content-container-body">
                    {/* <div className="widget">
                        <strong>Name of group: </strong><span>{onepost.grouppage.name}</span><br></br>
                        <strong>Name of user: </strong><span>{onepost.username}</span><br></br>
                        <strong>Time: </strong><span>{onepost.time}</span><br></br>
                        <strong>User profile url: </strong><a href={onepost.user_url} target="_blank">{onepost.user_url}</a><br></br>
                        <strong>Post profile url: </strong><a href={onepost.post_url} target="_blank">{onepost.post_url}</a><br></br>
                        <strong>Content: </strong><span>{onepost.text}</span><br></br>
                        {image()}
                        {clip()}
                        <strong>Likes: </strong><span>{onepost.likes}</span><br></br>
                        <strong>Comments: </strong><span>{onepost.comments}</span><br></br>
                        <strong>Shares: </strong><span>{onepost.shares}</span><br></br>
                    </div> */}
                    <Paper sx={{ mx: 5, mt: 3, boxShadow: 3, borderRadius: "15px", width: "auto" }} elvevation="1">
                        <List>
                            <PostInfoItem title="Name of Group" content={onepost.grouppage.name}></PostInfoItem>
                            <PostInfoItem title="Name of User" content={onepost.username}></PostInfoItem>
                            <PostInfoItem title="Time posting" content={onepost.time}></PostInfoItem>
                            <PostInfoItem
                                title="See Post on Facebook"
                                content={onepost.post_url}
                                link={onepost.post_url}
                            ></PostInfoItem>
                            {onepost.text == "" ? <PostInfoItem title="Content" content="None"></PostInfoItem>:<PostInfoItem title="Content" content=""></PostInfoItem>}
                            {onepost.text == "" ? "":<PostInfoItem content={onepost.text}></PostInfoItem>}
                            <PostInfoItem title="Reactions" content={onepost.likes}></PostInfoItem>
                            <PostInfoItem title="Comment" content={onepost.comments}></PostInfoItem>
                            <PostInfoItem title="Share" content={onepost.shares}></PostInfoItem>
                        </List>
                    </Paper>

                    {image()}

                    {video()}
                </div>

            </div>
        </div>
    )
}

export default Bai