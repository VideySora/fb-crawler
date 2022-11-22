import React from 'react'
import "./single.scss"
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import "../../utilites/widget.scss"
import LikeChart from '../../components/Chart/LikeChart'

function Single() {
    return (
    <div className='single-group-page'>
            <Sidebar />
            <div className="single-group-page-container">
                <Navbar />
                <span className='divider'><hr /></span>
                <div className="content-container">
                    <div className="chart-container widget">
                        This is the chart for Most comment or Most like
                        <LikeChart/>
                    </div>
                    <div className="center">
                        meo meo
                    </div>
                    <div className="list-container widget">
                        This is table for post detail of the page
                    </div>
                </div>

            </div>
        </div>
  )
}

export default Single