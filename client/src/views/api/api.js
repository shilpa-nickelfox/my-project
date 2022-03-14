// const PORTNUMBER = "http://localhost:3003/v1/admin";
const PORTNUMBER ="https://serene-atoll-14790.herokuapp.com:443/v1/admin"

const API = {
  PORTNUMBER:`${PORTNUMBER}`,
  LOGIN_API:`${PORTNUMBER}/login`,

  // FORGETPASSWORD_API:`${PORTNUMBER}/forgetPassword`,
  FORGETPASSWORD_API:`${PORTNUMBER}/verifyUser`,
  SENDFORGOTPASSMAIL_API:`${PORTNUMBER}/forgetPassword`,
  RESETPASSWORD_API:`${PORTNUMBER}/resetPassword`,


  CHANGEPASSWORD_API:`${PORTNUMBER}/changePassword

  `
}
export default API;