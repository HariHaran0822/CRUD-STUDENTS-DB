import React, { useState } from "react";
import axios from "axios";
import "./updateStudent.css";

export const UpdateStudentDetails = ({ showUpdate }) => {
  const [email, setEmail] = useState("");
  const [upd_First_Name, setUpd_First_Name] = useState("");
  const [upd_Last_Name, setUpd_Last_Name] = useState("");
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [emailEmpty, setemailEmpty] = useState(false);
  const [sub1, setsub1] = useState("");
  const [sub2, setsub2] = useState("");
  const [sub3, setsub3] = useState("");
  const [sub4, setsub4] = useState("");
  const [sub5, setsub5] = useState("");
  const [subjectsErr, setSubjectsErr] = useState("");
  const [invalidSubjects, setInvalidSubjects] = useState("");

  const UPDATE_BASEURL = `http://localhost:5000/students/${email}`;

  const handleUpdateDetails = async (e) => {
    e.preventDefault();

    if (!email) {
      setemailEmpty(true);
      return;
    } else {
      setemailEmpty(false);
    }

    const subjects = [
      sub1.trim(),
      sub2.trim(),
      sub3.trim(),
      sub4.trim(),
      sub5.trim(),
    ].filter(Boolean);

    try {
      await axios.put(UPDATE_BASEURL, {
        first_name: upd_First_Name,
        last_name: upd_Last_Name,
        subjects: subjects,
      });
      alert("Student Data Updated successfully!");
      setEmail("");
      setUpd_First_Name("");
      setUpd_Last_Name("");
      setFirstNameErr("");
      setLastNameErr("");
      setSubjectsErr("");
      setInvalidSubjects("");
      setsub1("");
      setsub2("");
      setsub3("");
      setsub4("");
      setsub5("");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        const errorResponse = error.response.data;
        setEmailErr(errorResponse.email || "");
        setFirstNameErr(errorResponse.firstName || "");
        setLastNameErr(errorResponse.lastName || "");
        setSubjectsErr(errorResponse.subjects || "");
        setInvalidSubjects(errorResponse.invalidSubjects || "");
      }
    }
  };

  if (!showUpdate) {
    return null;
  }

  return (
    <div className="main-upd-container">
      <h3>Update Student Data By Email Address</h3>
      <form>
        <div className="upd-container">
          <div className="input-upd-con">
            <label>Email :</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="upd-inp"
            />
            <span id="err">
              {emailErr && emailErr}
              {emailEmpty && "Please Enter Email Address"}
            </span>
          </div>

          <div className="input-upd-con">
            <label>FirstName :</label>
            <input
              type="text"
              value={upd_First_Name}
              onChange={(e) => setUpd_First_Name(e.target.value)}
              id="upd-inp"
            />
            <span id="err">{firstNameErr && firstNameErr}</span>
          </div>
          <div className="input-upd-con">
            <label>LastName :</label>
            <input
              type="text"
              value={upd_Last_Name}
              onChange={(e) => setUpd_Last_Name(e.target.value)}
              id="upd-inp"
            />{" "}
            <span id="err">{lastNameErr && lastNameErr}</span>
          </div>
          <div className="input-upd-con">
            <label>Subject 1 :</label>
            <input
              type="text"
              value={sub1}
              onChange={(e) => setsub1(e.target.value)}
              id="upd-inp"
            />{" "}
          </div>
          <div className="input-upd-con">
            <label>Subject 2 :</label>
            <input
              type="text"
              value={sub2}
              onChange={(e) => setsub2(e.target.value)}
              id="upd-inp"
            />{" "}
          </div>
          <div className="input-upd-con">
            <label>Subject 3 :</label>
            <input
              type="text"
              value={sub3}
              onChange={(e) => setsub3(e.target.value)}
              id="upd-inp"
            />{" "}
          </div>
          <div className="input-upd-con">
            <label>Subject 4 :</label>
            <input
              type="text"
              value={sub4}
              onChange={(e) => setsub4(e.target.value)}
              id="upd-inp"
            />{" "}
          </div>
          <div className="input-upd-con">
            <label>Subject 5 :</label>
            <input
              type="text"
              value={sub5}
              onChange={(e) => setsub5(e.target.value)}
              id="upd-inp"
            />{" "}
          </div>
          <span id="err">
            {subjectsErr && subjectsErr}
            {invalidSubjects && invalidSubjects}
          </span>
          <button id="btn-p" type="submit" onClick={handleUpdateDetails}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
