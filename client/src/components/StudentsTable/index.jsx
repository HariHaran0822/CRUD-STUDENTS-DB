import React from "react";
import "./studentsTable.css";
export const StudentsTable = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{props.item.first_name}</td>
            <td>{props.item.last_name}</td>
            <td>{props.item.email}</td>
            <td className="sub">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                {props.item.subjects.map((e) => (
                  <p key={Math.random()}> {e.name}</p>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
