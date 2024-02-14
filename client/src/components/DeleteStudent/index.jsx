import axios from "axios";
import React, { useState } from "react";

export const DeleteStudentRecord = ({ showDeleteStudent }) => {
  const [deleteEmail, setDeleteEmail] = useState("");
  const [deletedRes, setDeletedRes] = useState("");
  const [error, setError] = useState("");

  const DELETE_BASE_URL = `http://localhost:5000/students/${deleteEmail}`;

  const handleDeleteUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(DELETE_BASE_URL);
      setDeletedRes(response.data);
      setError("");
      console.log(`${deleteEmail} record is deleted`);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        const errorResponse = error.response.data;
        setError(errorResponse.notfound || "Email Not Found");
      } else {
        setError("INVALID EMAIL");
      }
    }
  };

  if (!showDeleteStudent) {
    return;
  }
  return (
    <div>
      <h2>To Delete a Student Record, Please Enter their Email Id</h2>
      <form>
        <input
          type="text"
          value={deleteEmail}
          onChange={(e) => setDeleteEmail(e.target.value)}
        />
        <button onClick={handleDeleteUser}>Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {deletedRes && <p>Record deleted successfully.</p>}
    </div>
  );
};
