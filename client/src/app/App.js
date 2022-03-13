import '../App.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../assets/scss/css/style.scss'
import { useSelector,useDispatch } from "react-redux"

import {BrowserRouter, Switch, Route} from 'react-router-dom'

// sidenav header
import Header from  '../containers/header/header'
import SideNav from '../containers/sidenav/sidenav'

// dashboard
import Dasboard from '../views/dashboard/dashboard'

// login crediantials
import Login from '../views/auth/login/login'
import ResetPassword from '../views/auth/resetPassword/resetPassword'
import ResetMail from '../views/auth/resetMail/resetMail'
import ResetPasswordLink from '../views/auth/resetPwLink/resetPasswordLink'

// User management

import UserList from '../views/userManagement/userManagement/userManagement'
import AddUser from '../views/userManagement/addUser/addUser'
import EditUser from '../views/userManagement/editUser/editUser'
import { useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import { toasterValue } from '../redux/actions/action'




function App() {
  const toggle = useSelector((state) => state.toggleReducers);
  const toastValue = useSelector((state) => state.toastReducers)
  const dispatch = useDispatch()
useEffect(()=>{
  toast.success(toastValue)
  dispatch(toasterValue(null))
})

  return (
    <div className={"App " + `${toggle ? "" : "toggleClass"}`}>
    
    <BrowserRouter>
    <Header/>
     <SideNav/>
    <Switch>
      <main>
        {/* login routes */}
      <Route exact path="/" component={Login} />
      <Route exact path="/resetPassword/:resetPwdToken" component={ResetPassword} />
      <Route exact path="/resetmail" component={ResetMail} />
      <Route exact path="/resetPasswordLink" component={ResetPasswordLink} />


      {/* dashboard routs */}
      <Route exact path="/dashboard" component={Dasboard} />

       {/* User management routes */}
       <Route exact path="/UserManagement" component={UserList} />
       <Route exact path="/AddUser" component={AddUser} />
       <Route exact path="/EditUser/:id" component={EditUser} />



      </main>
    </Switch>
    </BrowserRouter>
    <ToastContainer />

    </div>
  );
}

export default App;
