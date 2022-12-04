import React from 'react'
import "./bai.scss"
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import "../../utilites/widget.scss"
import LikeChart from '../../components/Chart/LikeChart'
import ReactPieChart from '../../components/Chart/ReactPieChart'

function Bai({ baiposts }) {
    let bid = useParams().bid;
    // let groupName = baiposts[0].grouppage.name;
    let onepost = baiposts.find(re => re._id == bid);
    function image() {
        if (onepost.images_lowquality.length != 0) {
            return (
                <>
                    <strong>Images: </strong>
                    {onepost.images_lowquality.map(imag => (
                        <img src={imag}></img>
                    ))}
                    <br></br>
                </>
            )
        }
    }
    function clip() {
        if (onepost.video != null) {
            return (
                <>
                    <strong>Video: </strong>
                    <video width="320" height="240" controls>
                        <source src={onepost.video} type="video/mp4"></source>
                    </video>
                    <br></br>
                </>
            )
        }
    }
    return (
    <div className='single-group-page'>
            <Sidebar />
            <div className="single-group-page-container">
                <Navbar />
                <span className='divider'><hr /></span>
                <div className="content-container">
                    <div className="widget">
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
                    </div>
                </div>

            </div>
        </div>
  )
}

export default Bai