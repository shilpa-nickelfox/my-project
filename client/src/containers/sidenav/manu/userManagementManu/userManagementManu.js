import React from "react"
import { Accordion, Card } from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa';




const UserManagement=()=>{
    return(
        <Card>
          <ul>
            <li className="deactive"><NavLink to="/UserManagement" ><span className="image-nav"><FaRegUser/></span><span className="img-active"><FaRegUser/></span>User Management <i className="fa fa-angle-right" aria-hidden="true" /></NavLink>
            </li>

          </ul>
      </Card>
    )
}

export default UserManagement;