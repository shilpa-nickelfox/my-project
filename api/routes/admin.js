var router = require("express").Router();
var admin = require("../handlers/admin/adminuser");
var { isAuthenticated } = require("../middleware/auth");
var { body, validationResult } = require("express-validator");
var {
  successMsg,
  failedMsg,
  failedAuth,
  missingAuth,
  crashed,
} = require("../utility/response");

router.post(
  "/register",
  [
    body("name").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // return res.status(422).json({ errors: errors.array() });
      failedMsg.message = errors.msg;
      failedMsg.data.errors = errors.array();

      res.send(failedMsg);
    } else {
      admin.register(req, res);
    }
  }
);



router.post(
  "/login",
  [body("email").not().isEmpty(), body("password").not().isEmpty()],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // return res.status(422).json({ errors: errors.array() });
      failedMsg.message = errors.msg;
      failedMsg.data.errors = errors.array();

      res.send(failedMsg);
    } else {
      admin.login(req, res);
    }
  }
);

router.get("/getAllAdminUser", isAuthenticated, (req, res) => {
  admin.getAllAdminUser(req, res);
});

router.post("/timeStatus/:id", isAuthenticated, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // return res.status(422).json({ errors: errors.array() });
    failedMsg.message = errors.msg;
    failedMsg.data.errors = errors.array();
    res.send(failedMsg);
  } else {
    admin.timeStatus(req, res);
  }
});


module.exports = router;
