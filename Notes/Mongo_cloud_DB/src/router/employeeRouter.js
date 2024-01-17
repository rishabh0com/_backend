const express = require("express");
const { employeeModel } = require("../database/db");
const { authAccess } = require("../middlewares/authAccess");
const empRouter = express.Router();

// get request for all employees :
empRouter.get("/employees", async (req, res) => {
  try {
    const allemployee = await employeeModel.find();
    res.status(200).send({ all_employee: allemployee });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// post request for add empolyee :
empRouter.post("/add-employee", async (req, res) => {
  try {
    // console.log(req.body);
    const newEmployee = new employeeModel(req.body);
    await newEmployee.save();
    res
      .status(201)
      .send({ msg: "employee added ~", new_employee: newEmployee });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// patch request for update empolyee
empRouter.patch("/update-employee/:id", authAccess, async (req, res) => {
  try {
    const updateEmp = await employeeModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    // console.log(updateEmp);
    res
      .status(201)
      .send({ msg: "employee has updated", updatedEmployee: updateEmp });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// delete req for delete the employee :
empRouter.delete("/delete-employee/:id", authAccess, async (req, res) => {
  try {
    const deletedEmp = await employeeModel.findByIdAndDelete(req.params.id);
    console.log(deletedEmp);
    res.status(200).send({ msg: "empolyee has deleted" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

// export the employee_router
module.exports = { empRouter };
