import React from 'react'
import "./single.scss"
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import BaiTable from '../../components/Table/BaiTable'
import "../../utilites/widget.scss"
import LikeChart from '../../components/Chart/LikeChart'
import ReactPieChart from '../../components/Chart/ReactPieChart'
import {Link, useParams} from "react-router-dom"
import "../../utilites/page.scss"


function Single({ baiposts, setUser, setToken, setProjects, setGrouppages, setBaiposts, projects, grouppages }) {
    let gid = useParams().gid;
    let groupPost = baiposts.filter(bp => (bp.grouppage._id === gid))
    return (
    <div className='single-group-page page'>
            <Sidebar setUser={setUser} setToken={setToken} setProjects={setProjects} setGrouppages={setGrouppages} setBaiposts={setBaiposts}  />
            <div className="single-group-page-container content-container">
                <Navbar projects={projects} grouppages={grouppages} baiposts={baiposts} />
                <span className='divider'><hr /></span>
                <div className="content-container-body">
                    <div className="list-container widget">
                        <BaiTable className="link-table"
                            baiposts={baiposts} grouppages={grouppages} />
                    </div>
                    <div className="chart-container widget">
                        This is the chart for Most comment or Most like
                        {console.log("groupPost is: ", groupPost)}
                        <LikeChart groupPost={groupPost}/>
                    </div>
                    <div className="center">
                        <div className="left widget">
                            <ReactPieChart/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
  )
}

export default Single