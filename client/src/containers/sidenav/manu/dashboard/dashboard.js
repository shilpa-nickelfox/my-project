import React from "react"
import { Accordion, Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'


const Dashboard = () => {
  return (
    <Card>
        <ul>
          <li className="deactive"><NavLink to="/dashboard"><span className="image-nav"><MdDashboard /></span><span className="img-active"><MdDashboard /></span>Dashboard <i className="fa fa-angle-right" aria-hidden="true" /></NavLink>
          </li>

        </ul>
    </Card>
  )
}

export default Dashboard;