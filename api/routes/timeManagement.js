var router = require('express').Router(); 
var handler = require('../handlers/admin/TimeManagement');
var { isAuthenticated } = require('../middleware/auth');
var { body, validationResult } = require('express-validator');
var { successMsg, failedMsg, failedAuth, missingAuth, crashed } = require('../utility/response');

router.post('/timeCreate', isAuthenticated, [body('projectName').not().isEmpty(), body('client').not().isEmpty()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(422).json({ errors: errors.array() });
        failedMsg.message = errors.msg;
        failedMsg.data.errors = errors.array();
    
        res.send(failedMsg)
    
      }else{
      
        handler.timeCreate(req, res);
      }

   
});

router.get('/getAlltime', isAuthenticated, (req, res)=> {
 
        handler.getAlltime(req, res);
});

router.post('/gettimeById', isAuthenticated, [body('Id').not().isEmpty()],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(422).json({ errors: errors.array() });
        failedMsg.message = errors.msg;
        failedMsg.data.errors = errors.array();
    
        res.send(failedMsg)
                                                                     
      }else{
          handler.gettimeById(req, res);
      }
});

router.post('/edittime', isAuthenticated, body('Id').not().isEmpty().isMongoId(), (req, res) => {
   
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
  
        // return res.status(422).json({ errors: errors.array() });
        failedMsg.message = errors.msg;
        failedMsg.data.errors = errors.array();
    
        res.send(failedMsg)
    
      }else{
      
        handler.edittime(req, res);
      }

   
});

router.delete('/timeDelete', isAuthenticated, [body('id').not().isEmpty()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      // return res.status(422).json({ errors: errors.array() });
      failedMsg.message = errors.msg;
      failedMsg.data.errors = errors.array();
  
      res.send(failedMsg)
  
    }else{
    
      handler.timeDelete(req, res);
    }

 
});




module.exports = router;
