const { validationResult } = require('express-validator/check');
const dashboardTablesDB = require('../../models/dashboard');
const dashboardTrans = require('../../transformers/DashboardTransfromer');

exports.getDashBoard = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  dashboardTablesDB.getDashBoardContent().then((success) => {
    return res.status(200).json(dashboardTrans.transformDashboard(success));
  }, (err) => {
    return res.status(422).json({ errors: "Something went wrong" });
  });
};
