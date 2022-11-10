import React from 'react'
import "./single.scss"
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import "../../utilites/widget.scss"

function Single() {
  return (
    <div className='single-group-page'>
            <Sidebar />
            <div className="single-group-page-container">
                <Navbar />
                <span className='divider'><hr /></span>
                <div className="content-container">
                    <div className="Chart-container widget">
                        This is the chart for Most comment or Most like
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