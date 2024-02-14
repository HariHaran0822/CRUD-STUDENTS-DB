import { useState } from "react";
import "./App.css";
import { StudentsInput } from "./components/StudentsInput";
import { UpdateStudentDetails } from "./components/UpdateStudent";
import { GetStudents } from "./components/GetStudents";
import { DeleteStudentRecord } from "./components/DeleteStudent";

export const BASEURL = "http://localhost:5000/students";

function App() {
  const [showInsert, setShowInsert] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showStudent, setShowStudent] = useState(false);
  const [showDeleteStudent, setShowDeleteStudent] = useState(false);

  const handlePost = () => {
    setShowInsert(!showInsert);
    setShowUpdate(false);
    setShowStudent(false);
    setShowDeleteStudent(false);
  };

  const handlePut = () => {
    setShowInsert(false);
    setShowUpdate(!showUpdate);
    setShowStudent(false);
    setShowDeleteStudent(false);
  };
  const handleGetStudents = () => {
    setShowStudent(!showStudent);
    setShowInsert(false);
    setShowUpdate(false);
    setShowDeleteStudent(false);
  };
  const handleDeleteStudents = () => {
    setShowStudent(false);
    setShowInsert(false);
    setShowUpdate(false);
    setShowDeleteStudent(true);
  };

  return (
    <>
      <h2>Welcome to Students DB</h2>
      <div>
        <div className="nav">
          <button onClick={handlePost} className="btn-post">
            Add Student Data
          </button>
          <button onClick={handlePut} className="btn-put">
            Update Student Data
          </button>
          <button onClick={handleGetStudents} className="btn-get">
            Get All Student Data
          </button>
          <button onClick={handleDeleteStudents} className="btn-delete">
            Delete Student Data
          </button>
        </div>
        <div>
          <DeleteStudentRecord showDeleteStudent={showDeleteStudent} />
          <StudentsInput showInsert={showInsert} />
          <UpdateStudentDetails showUpdate={showUpdate} />
          <GetStudents showStudent={showStudent} />
        </div>
      </div>
    </>
  );
}

export default App;
