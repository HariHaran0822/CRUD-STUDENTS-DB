const express = require("express");
const route = express.Router();
const {
  getAllStudent,
  getStudentByEmail,
  postNewStudent,
  updateStudentsDetails,
  deleteStudentByemail,
  getByFirstName,
  getByLastName,
} = require("../Controller/StudentsController");

const { getAllSubjects } = require("../Controller/SubjectsController");

route.get("/students", getAllStudent);
route.post("/students", postNewStudent);
route.get("/students/email/:email", getStudentByEmail);
route.get("/students/firstname/:firstname", getByFirstName);
route.get("/students/lastname/:lastname", getByLastName);
route.put("/students/:email", updateStudentsDetails);
route.delete("/students/:email", deleteStudentByemail);
route.get("/subjects", getAllSubjects);

module.exports = route;
