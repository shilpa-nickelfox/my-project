import React,{useEffect, useState}  from 'react'
import { ImageObj } from '../../../assets/images/imgeObject'
import {useHistory ,useLocation, Redirect} from 'react-router-dom'
import loginAPI from "../../api/api";
import {toast, ToastContainer} from 'react-toastify';
import { toasterValue } from '../../../redux/actions/action';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useDispatch } from 'react-redux';



const Login = (props) => {
    const dispatch = useDispatch()

    const [errEmail, setErrEmail] = useState();
    const [errPass, setErrPass] = useState();


    const history = useHistory();
    const location = useLocation();
    const { register, handleSubmit } = useForm();

    const pathname = location.pathname;

    useEffect(() => {

        if (typeof props.location.customdata != "undefined" && props.location.customdata) {
            toast.success("You have successfully logout");
        }
        else {
            return;
        }
    })

  
   useEffect(() => {
    document.body.classList.add("remove-header");
       return () => {
        document.body.classList.remove("remove-header");
       }
   },[])

   
   useEffect(() => {
    const Auth1 = localStorage.getItem("authtoken");

    if (Auth1 === null) {
        return <Redirect to="/" />
    }else{
        return <Redirect to="/dashboard" />
    }
},[])




const onSubmit = (data) => {
    axios.post(loginAPI.LOGIN_API, {email: data.email, password: data.password})
    .then((res) => {
        switch(res.data.message){
            case "Failed to login":
                setErrEmail("Invalid email or password")
                setErrPass("")

                break;
            case "Please Enter Correct Password":
                setErrPass(res.data.message)
                setErrEmail("")
                break;

        }
        if (res.data.message !== "Login successfully") {
        }  else {
            localStorage.setItem("username", res.data.data.name);
            localStorage.setItem(
                "authtoken",
                res.data.data.authorizeToken                                                                                 
            );
            dispatch(toasterValue("You have logged in successfully."))
            history.push({ pathname: "/dashboard", customdata: { pathname } })
            }
       
    })
}
  
    return (
        <div className="container">
            <ToastContainer/>
            <div className="max-new-second">
                <div className="main-theme bg-theme border otp-pad new shadow">
                    <section className="select-state">
                        <div className="state-bor">
                            <div className="log-in otp-num">
                                <div className="select-steps-box">
                                    <div className="input-head">
                                        <h2>Welcome Back</h2>
                                    </div>
                                </div>
                                <div className="select-box-top pr-0">
                                    <div className="input-box">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="col-12 p-0">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                        <input type="email" className="form-control"  {...register('email', { required: true })} placeholder="Enter email" required/>
                                                            <small id="emailHelp" className=" form-text text-muted">{errEmail}</small>
                                                                </div>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                        <input type="password" className="form-control"  {...register('password', { required: true })} placeholder="Enter password" required/>
                                                             <small id="emailHelp" className="  form-text text-muted">{errPass}</small>
                                                            <p className="resend new mt-2"><a href="/resetmail">Forgot Password?</a></p>
                                                            <small id="emailHelp" className="d-none form-text text-muted">We'll never share your email with anyone else.</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="theme-btn select-m">
                                        <button className="btn verfy-btn" type="submit">LOGIN <span><img src={ImageObj.ArrowWhite} alt="" /></span></button>
                                    </div>
                                        </form>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Login;