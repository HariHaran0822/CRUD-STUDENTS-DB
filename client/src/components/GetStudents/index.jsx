import React, { useState, useEffect } from "react";
import axios from "axios";
import { StudentsTable } from "../StudentsTable";
import "./getStudents.css";

export const BASEURL = "http://localhost:5000/students";

export const GetStudents = ({ showStudent }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = () => {
    axios.get(BASEURL).then((res) => setData(res.data));
  };

  useEffect(() => {
    if (showStudent) {
      fetchData();
    }
  }, [showStudent]);

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return showStudent ? (
    <div className="students-detail">
      <div className="filter">
        <input
          type="text"
          placeholder="Search by email, first name, or last name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          id="filter-inp"
        />
      </div>
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <StudentsTable key={item.id} item={item} />
          ))
        ) : (
          <p>No such data found</p>
        )}
      </div>
    </div>
  ) : null;
};
