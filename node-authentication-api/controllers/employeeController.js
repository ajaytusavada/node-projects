var db = require("../models");
var Employee = db.employee;
var addEmployee = async (req, res) => {
    try {
      var userId = req.user.userId;
      var reqs = req.body;
      const employee = await Employee.create({
        user_id: userId,
        hire_date: reqs.hire_date,
        salary: reqs.salary,
        position: reqs.position,
        isActive: true,
      });
      console.log(employee);
      res
        .status(201)
        .json({ message: "employee created successfully", data: employee });
    } catch (error) {
      res.status(500).json({ message: "Error in create employee", error: error });
    }
  };
  module.exports = {
    addEmployee
  };