var {
  successMsg,
  failedMsg,
  failedAuth,
  missingAuth,
  crashed,
} = require("../utility/response");

/**
 *
 * @param {*} modelPath
 * @param {*} input
 * @param {*} res
 * @param {*} errMessage
 * @param {*} successMessage
 */
const createOperation = (
  model,
  input,
  res,
  isRegister = false,
  errMessage,
  successMessage
) => {
  if (isRegister) {
    model.findOne(
      { phoneNumber: input.phoneNumber, userStatus: 1 },
      {},
      (err, response) => {
        if (err) {
          res.send(crashed);
        } else {
          if (response) {
            input["isVerified"] = response.isVerified;
            model.updateOne(
              { phoneNumber: input.phoneNumber },
              { $set: input },
              (err, status) => {
                if (err) {
                  res.send(crashed);
                } else {
                  if (status.nModified > 0) {
                    (successMsg.status = true),
                      (successMsg.statusCode = 200),
                      (successMsg.message = "Login successfully");
                    successMsg.data.result = input;
                    successMsg.data.results = [];
                    res.send(successMsg);
                  } else {
                    failedMsg.message = errMessage;
                    failedMsg.data.result = {};
                    failedMsg.data.results = [];

                    res.send(failedMsg);
                  }
                }
              }
            );
          } else {
            var addUser = new model(input);
            addUser.save((err, status) => {
              if (err) {
                res.send(crashed);
              } else {
                (successMsg.status = true),
                  (successMsg.statusCode = 200),
                  (successMsg.message = successMessage);
                successMsg.data.result = status;
                successMsg.data.results = [];
                res.send(successMsg);
              }
            });
          }
        }
      }
    );
  } else {
    var addUser = new model(input);

    addUser.save((err, status) => {
      if (err) {
        res.send(crashed);
      } else {
        successMsg.message = successMessage;
        successMsg.data.result = {};
        successMsg.data.results = [status];
        res.send(successMsg);
      }
    });
  }
};

/**
 *
 * @param {*} modelPath
 * @param {*} input
 * @param {*} res
 * @param {*} errMessage
 * @param {*} successMessage
 */
const loginOperation = (model, input, res, errMessage, successMessage) => {
  model.findOne(
    input,
    { authorizeToken: 1, name: 1, phoneNumber: 1 },
    (err, status) => {
      if (err) {
        res.send(crashed);
      } else {
        if (status) {
          successMsg.message = successMessage;
          successMsg.data.result = status;
          successMsg.data.results = [];
          res.send(successMsg);
        } else {
          failedMsg.message = errMessage;
          failedMsg.data.result = {};
          failedMsg.data.results = [];

          res.send(failedMsg);
        }
      }
    }
  );
};

/**
 * 
 * @param {*} modelPath 
 * @param {*} input 
 * @param {*} res 
 * @param {*} errMessage 
 * @param {*} successMessage 
 */
const listOperation = async (model, input, projection, req, res, errMessage, successMessage) => {
  // { authorizeToken : 0, password : 0 }

  await model.countDocuments(input, async (err, allDocument) => {
    if (err) {
      res.send(crashed);
    } else {
      var totalUser = allDocument;
      var perPage = 50;
      var totalPage = Math.ceil(allDocument / perPage);
      var page = 1;
      if (req.body.currentPage) {
        page = req.body.currentPage
      }
      var skipData = (page * perPage) - perPage

      await model.find(input, projection, (err, status) => {
        if (err) {
          res.send(crashed);
        } else {
          if (status) {
            res.end(JSON.stringify({
              success: true,
              status: 200,
              message: successMessage,
              data: {
                result: { currentPage: page, totalPage: totalPage, perPage: perPage, totalUser: totalUser },
                results: status
              }
            }));
          } else {
            failedMsg.message = errMessage;
            failedMsg.data.result = {};
            failedMsg.data.results = [];
            res.end(JSON.stringify(failedMsg));
          }

        }
      }).limit(perPage).skip(skipData).sort({ created_at: -1 });
    }
  });

}


const AdminLoginOperation = (model, input, res, errMessage, successMessage) => {
  model.findOne(input, { authorizeToken: 1, name: 1, email: 1 }, (err, status) => {
    if (err) {
      res.send(crashed);
    } else {
      if (status) {
        res.send({
          success: true,
          status: 200,
          message: successMessage,
          data: status
        });

      } else {
        failedMsg.message = errMessage;
        failedMsg.data.result = {};
        failedMsg.data.results = [];
        res.end(JSON.stringify(failedMsg));
      }

    }
  });
}

/**
 * 
 * @param {*} modelPath 
 * @param {*} input 
 * @param {*} updateData 
 * @param {*} res 
 * @param {*} isExists 
 * @param {*} errMessage 
 * @param {*} successMessage 
 */

const updateOperation = async (model, input, updateData, res, isExists = false, errMessage, successMessage) => {

  model.updateOne(input, { $set: updateData }, (err, status) => {
    if (err) {
      console.error(err);
      res.send(crashed);
    } else {
      res.end(JSON.stringify({ "message": successMessage, data: {}, status: 200 }))

    }
  });

}
const showOperation = (
  model,
  input,
  projection,
  res,
  errMessage,
  successMessage
) => {
  // { authorizeToken : 0, password : 0 }
  model.findOne(input, projection, (err, status) => {
    if (err) {
      res.send(crashed);
    } else {
      if (status) {
        successMsg.message = successMessage;
        successMsg.data.result = status;
        successMsg.data.results = [];
        res.send(successMsg);
      } else {
        failedMsg.message = errMessage;
        failedMsg.data.result = {};
        failedMsg.data.results = [];

        res.send(failedMsg);
      }
    }
  });
};

const deleteOperation = (
  model,
  input,
  res,
  errMessage,
  successMessage
) => {
  model.deleteOne(input, (err, status) => {
    if (err) {
      res.send(crashed);
    } else {
      if (status.deletedCount > 0) {
        // console.log(status);
        successMsg.message = successMessage;
        successMsg.data.result = {};
        successMsg.data.results = [];
        res.send(successMsg);
      } else {
        failedMsg.message = errMessage;
        failedMsg.data.result = {};
        failedMsg.data.results = [];

        res.send(failedMsg);
      }
    }
  });
};

const countOperation = async (
  model,
  input,
  res,
  errMessage,
  successMessage
) => {
  await model.count(input, (err, status) => {
    if (err) {
      res.send(crashed);
      console.error(err);
    } else {
      successMsg.message = successMessage;
      successMsg.data.result = status;
      successMsg.data.results = [];
      res.send(successMsg);
    }
  });
};


module.exports = {
  createOperation,
  loginOperation,
  listOperation,
  updateOperation,
  showOperation,
  deleteOperation,
  countOperation,
  AdminLoginOperation
};
