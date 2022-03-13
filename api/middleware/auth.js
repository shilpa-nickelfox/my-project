var { successMsg, failedMsg, failedAuth, missingAuth, crashed } = require('../utility/response');
var Adminuser = require('../models/Adminuser');
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function isAuthenticated(req, res, next) {

  if ('authtoken' in req.headers) {
    Adminuser.findOne({ authorizeToken: req.headers.authtoken }, function(err, user) {
      if(err) {
        res.send(crashed);
      }else{
        if(user) {
          res.locals.user = user; 
          return next();

        }else{
          res.send(failedAuth);
        }
      }
    });
  }else{
    res.send(missingAuth);
  }

}

module.exports = {
    isAuthenticated
}