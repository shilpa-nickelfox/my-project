import React from 'react'
import { Accordion } from 'react-bootstrap'
import  Dashboard from './manu/dashboard/dashboard'
import  UserManagement from './manu/userManagementManu/userManagementManu'

const SideNav = () => {
  return (
      <aside className="property side-nav">
  
        <div className="side-nav-menu">
          <div className="sec">
            <Accordion defaultActiveKey="0">
             <Dashboard/>
             <UserManagement/>
            </Accordion>
          </div>
        </div>
      </aside>
  )
}

export default SideNav;