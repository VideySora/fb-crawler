import React from 'react'
import "./bai.scss"
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import "../../utilites/widget.scss"
import LikeChart from '../../components/Chart/LikeChart'
import ReactPieChart from '../../components/Chart/ReactPieChart'

function Bai({baiposts}) {
    return (
    <div className='single-group-page'>
            <Sidebar />
            <div className="single-group-page-container">
                <Navbar />
                <span className='divider'><hr /></span>
                <div className="content-container">
                    <div className="list-container widget">
                    
                    </div>
                    <div className="chart-container widget">
                        This is the chart for Most comment or Most like
                        <LikeChart/>
                    </div>
                    <div className="center">
                        <div className="left widget">
                            <ReactPieChart/>
                        </div>
                        <div className="right widget"></div>
                    </div>
                </div>

            </div>
        </div>
  )
}

export default Bai