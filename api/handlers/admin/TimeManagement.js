var crud = require('../../utility/crud');
var slugify = require('slugify')

const timeManagementModel = require('../../models/TimeManagement');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const timeCreate = (req, res) => {
  var errMessage = "Failed to add time"
  var successMessage = "Client added successfully"

  var data = {
    projectName: req.body.projectName,
    client: req.body.client,
    template: req.body.template,
    start: req.body.start,
    end: req.body.end
  }

  crud.createOperation(timeManagementModel, data, res, isRegister = false, errMessage, successMessage);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const timeDelete = (req, res) => {
  var errMessage = "Failed to delete"
  var successMessage = "Delete successfully"

  var data = {
    _id: req.body.id
  }

  crud.deleteOperation(timeManagementModel, data, res, errMessage, successMessage);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAlltime = (req, res) => {
  var errMessage = "No record found"
  var successMessage = "All Pages"
  var user = res.locals.user;

  crud.listOperation(timeManagementModel, {}, {}, req, res, errMessage, successMessage);
}

/**
 * 
 * @param {*} req `w
 * @param {*} res 
 */
const gettimeById = (req, res) => {
  var errMessage = "No record found"
  var successMessage = "All Pages"
  var user = res.locals.user;
  // { authorizeToken : 0, password : 0 }
  timeManagementModel.findOne({ _id: req.body.Id }, {}, (err, status) => {
    if (err) {
      res.send(crashed);
    } else {
      if (status) {
        res.status(200).json({
          status: 200,
          message: successMessage,
          data: {
            result: status
          },
        });
      } else {
        res.send({
          message: errMessage,
          data: {
            result: {}, results: []
          },
        })
      }
    }
  });
  // crud.showOperation('../models/timeManagement', {_id : req.body.Id}, {}, res, errMessage, successMessage);
}

const edittime = (req, res) => {
  var errMessage = "Failed to update the page"
  var successMessage = "Page update successfully"
  var user = res.locals.user;
  var query = { _id: req.body.Id }
  var updateQuery = {
    projectName: req.body.projectName,
    client: req.body.client,
    template: req.body.template,
    start: req.body.start,
    end: req.body.end
  }

  crud.updateOperation(timeManagementModel, query, updateQuery, res, isExists = false, errMessage, successMessage);
}


module.exports = {
  timeCreate,
  getAlltime,
  gettimeById,
  edittime,
  timeDelete
}