import React, { useState } from "react";
import axios from "axios";
import { BASEURL } from "../../App";
import "./studentsInput.css";

export const StudentsInput = ({ showInsert }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [alreadyFoundErr, setAlreadyFoundErr] = useState("");
  const [response, setResponse] = useState("");
  const [invalidSubject, setInvalidSubject] = useState("");
  const [subjectErr, setSubjectErr] = useState("");
  const [sub1, setsub1] = useState("");
  const [sub2, setsub2] = useState("");
  const [sub3, setsub3] = useState("");
  const [sub4, setsub4] = useState("");
  const [sub5, setsub5] = useState("");
  const [emailErr, setemailErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subjects = [
      sub1.trim(),
      sub2.trim(),
      sub3.trim(),
      sub4.trim(),
      sub5.trim(),
    ].filter(Boolean);
    console.log(subjects);
    try {
      const response = await axios.post(BASEURL, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        subjects: subjects,
      });
      alert("Student added successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setFirstNameErr("");
      setLastNameErr("");
      setAlreadyFoundErr("");
      setInvalidSubject("");
      setResponse(response.data.message);
      setSubjectErr("");
      setsub1("");
      setsub2("");
      setsub3("");
      setsub4("");
      setsub5("");
      setemailErr("");
    } catch (error) {
      console.error("Error adding student:", error);
      if (error.response && error.response.data) {
        const errorResponse = error.response.data;
        setFirstNameErr(errorResponse.firstName || "");
        setLastNameErr(errorResponse.lastName || "");
        setResponse(errorResponse.message || "");
        setAlreadyFoundErr(errorResponse.emailExist || "");
        setInvalidSubject(errorResponse.invalidSubjects || "");
        setSubjectErr(errorResponse.subjects || "");
        setemailErr(errorResponse.emailError || "");
      } else {
        setSubjectErr("Failed to add student. Please try again.");
      }
    }
  };
  if (!showInsert) {
    return;
  }
  return (
    <div className="main-insert-container">
      <h3>Insert New Student Details</h3>
      <form>
        <div className="form-container">
          <div className="students-input-con">
            <label>First Name :</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id="students-input"
              placeholder="Enter First Name..."
            />
            <span style={{ color: "red", fontSize: "0.75rem" }}>
              {firstNameErr}
            </span>
          </div>
          <div className="students-input-con">
            <label>Last Name :</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="students-input"
              placeholder="Enter Second Name..."
            />
            <span style={{ color: "red", fontSize: "0.75rem" }}>
              {lastNameErr}
            </span>
          </div>
          <div className="students-input-con">
            <label>Email :</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="students-input"
              placeholder="Enter Email Address..."
            />
            <span style={{ color: "red", fontSize: "0.75rem" }}>
              {alreadyFoundErr && alreadyFoundErr}
              {emailErr && emailErr}
            </span>
          </div>
          <div className="students-input-con">
            <label>Subject 1:</label>
            <input
              type="text"
              value={sub1}
              onChange={(e) => setsub1(e.target.value)}
              id="students-input"
              placeholder="Enter Subject 1..."
            />
          </div>
          <div className="students-input-con">
            <label>Subject 2:</label>
            <input
              type="text"
              value={sub2}
              onChange={(e) => setsub2(e.target.value)}
              id="students-input"
              placeholder="Enter Subject 2..."
            />
          </div>{" "}
          <div className="students-input-con">
            <label>Subject 3:</label>
            <input
              type="text"
              value={sub3}
              onChange={(e) => setsub3(e.target.value)}
              id="students-input"
              placeholder="Enter Subject 3..."
            />
          </div>{" "}
          <div className="students-input-con">
            <label>Subject 4:</label>
            <input
              type="text"
              value={sub4}
              onChange={(e) => setsub4(e.target.value)}
              id="students-input"
              placeholder="Enter Subject 4..."
            />
          </div>{" "}
          <div className="students-input-con">
            <label>Subject 5:</label>
            <input
              type="text"
              value={sub5}
              onChange={(e) => setsub5(e.target.value)}
              id="students-input"
              placeholder="Enter Subject 5..."
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <span style={{ color: "green" }}>{response && response}</span>
            <span style={{ color: "red", fontSize: "0.75rem" }}>
              {invalidSubject && invalidSubject}
              {subjectErr && subjectErr}
            </span>
            <button
              style={{ backgroundColor: "#87CEEB", color: "white" }}
              type="submit"
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
