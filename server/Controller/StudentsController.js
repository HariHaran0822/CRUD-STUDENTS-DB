const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Students",
  password: "postgres",
  port: 5432,
});

// const client = new Client({
//   user: "hariharan",
//   host: "dev-pgsql-1.cdmitf0y2qoi.us-east-1.rds.amazonaws.com",
//   database: "hariharan",
//   password: "Hariharan@123",
//   port: 5432,
// });

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Error connecting to database: ", err));

const formatResponse = (student) => {
  return {
    id: student.id,
    first_name: `${student.first_name}`,
    last_name: `${student.last_name}`,
    email: student.email,
    subjects: student.subjects.map((subject) => ({
      name: subject,
    })),
  };
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.getAllStudent = (req, res) => {
  const query = "SELECT * FROM tbl_students";

  client
    .query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        res.json({ message: "Table is empty" });
      } else {
        console.log("ALL RECORDS");
        const formateRes = result.rows.map(formatResponse);
        res.json(formateRes);
      }
    })
    .catch((err) => console.log(err));
};

exports.getStudentByEmail = (req, res) => {
  const email = req.params.email;
  const query = "SELECT * FROM tbl_students WHERE email = $1";
  client
    .query(query, [email])
    .then((result) => {
      if (result.rows.length > 0) {
        console.log(`Record of ${req.params.email}`);
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ message: "email address not found" });
      }
    })
    .catch((err) => res.send(err));
};

exports.getByFirstName = (req, res) => {
  const firstname = req.params.firstname;
  const query = "SELECT * FROM tbl_students WHERE first_name =$1";
  client
    .query(query, [firstname])
    .then((result) => {
      if (result.rows.length > 0) {
        console.log(`Record of ${req.params.firstname}`);
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ message: "first name not found" });
      }
    })
    .catch((err) => res.send(err));
};

exports.getByLastName = (req, res) => {
  const lastname = req.params.lastname;
  const query = "SELECT * FROM tbl_students WHERE last_name =$1";
  client
    .query(query, [lastname])
    .then((result) => {
      if (result.rows.length > 0) {
        console.log(`Record of ${req.params.lastName}`);
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ message: "last name not found" });
      }
    })
    .catch((err) => res.send(err));
};

exports.postNewStudent = (req, res) => {
  const { first_name, last_name, email, subjects } = req.body;
  const errors = {};

  if (!first_name || first_name.length < 3) {
    errors.firstName = "First name must be at least 3 characters long";
  }

  if (!last_name || last_name.length < 3) {
    errors.lastName = "Last name must be at least 3 characters long";
  }

  if (!validateEmail(email)) {
    errors.emailError = "Invalid email address";
  }

  if (!Array.isArray(subjects) || subjects.length < 3 || subjects.length > 5) {
    errors.subjects = "Minimum  3 Subjects should be Entered";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  const checkSubjectsQuery = "SELECT sub_name FROM master_tbl_subjects";
  client
    .query(checkSubjectsQuery)
    .then((result) => {
      const existingSubjects = result.rows.map((row) => row.sub_name);
      console.log(existingSubjects);

      const invalidSubjects = subjects.filter(
        (subject) => !existingSubjects.includes(subject)
      );
      console.log(invalidSubjects);

      if (invalidSubjects.length > 0) {
        errors.invalidSubjects = `The following subjects are not valid: ${invalidSubjects.join(
          ", "
        )}`;
        return res.status(400).json(errors);
      } else {
        const checkEmailQuery = "SELECT * FROM tbl_students WHERE email = $1";
        client
          .query(checkEmailQuery, [email])
          .then((emailResult) => {
            if (emailResult.rows.length > 0) {
              errors.emailExist =
                "The given email address already exists. Please try with a different email.";
              return res.status(400).json(errors);
            } else {
              const insertQuery =
                "INSERT INTO tbl_students (first_name, last_name, email, subjects) VALUES ($1, $2, $3, $4)";
              const values = [first_name, last_name, email, subjects];
              client
                .query(insertQuery, values)
                .then(() => {
                  console.log("Record inserted successfully");
                  res
                    .status(200)
                    .json({ message: "Record inserted successfully" });
                })
                .catch((err) => {
                  console.error("Error inserting record: ", err);
                  res.status(500).json({ message: "Error inserting record" });
                });
            }
          })
          .catch((err) => {
            console.error("Error checking email: ", err);
            res.status(500).json({ message: "Error checking email" });
          });
      }
    })
    .catch((err) => {
      console.error("Error checking subjects: ", err);
      res.status(500).json({ message: "Error checking subjects" });
    });
};

exports.deleteStudentByemail = (req, res) => {
  const email = req.params.email;
  const check_email = "SELECT * FROM tbl_students WHERE email = $1";
  const errors = {};

  client
    .query(check_email, [email])
    .then((result) => {
      if (result.rows.length === 0) {
        errors.notfound = "Email Not Found";
        res.status(404).json(errors);
      } else {
        const query = "DELETE FROM tbl_students WHERE email = $1";
        client
          .query(query, [email])
          .then(() => {
            console.log("The Record is deleted successfully");
            res.json({ message: "The Record is deleted successfully" });
          })
          .catch((err) => {
            console.error("Error in deleting record", err);
            res.status(500).send("Error deleting record");
          });
      }
    })
    .catch((err) => {
      console.error("Error in querying database", err);
      res.status(500).send("Error querying database");
    });
};

exports.updateStudentsDetails = (req, res) => {
  const email = req.params.email;
  const { first_name, last_name, subjects } = req.body;
  const values = [first_name, last_name, subjects, email];
  const errors = {};

  if (!email) {
    errors.emailEmpty = "Please enter Email ";
  }

  if (!first_name || first_name.length < 3) {
    errors.firstName = "First name must be at least 3 characters long";
  }

  if (!last_name || last_name.length < 3) {
    errors.lastName = "Last name must be at least 3 characters long";
  }

  if (!Array.isArray(subjects) || subjects.length < 3 || subjects.length > 5) {
    errors.subjects = "Minimum 3 Subjects should be Entered";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  const check_query = "SELECT * FROM tbl_students WHERE email =$1";
  client
    .query(check_query, [email])
    .then((result) => {
      if (result.rows.length === 0) {
        errors.email = "Email id Not found, Please check again";
        return res.status(404).json(errors);
      } else {
        const check_subjects = "SELECT * FROM master_tbl_subjects";
        client.query(check_subjects).then((result) => {
          const existingSubjects = result.rows.map((row) => row.sub_name);
          console.log(existingSubjects);

          const invalidSubjects = subjects.filter(
            (subject) => !existingSubjects.includes(subject)
          );
          console.log(invalidSubjects);

          if (invalidSubjects.length > 0) {
            errors.invalidSubjects = `The following subjects are not valid: ${invalidSubjects.join(
              ", "
            )}`;
            return res.status(400).json(errors);
          } else {
            const query =
              "UPDATE tbl_students SET first_name=$1, last_name=$2, subjects=$3 WHERE email=$4";
            client
              .query(query, values)
              .then(() => {
                console.log("Updated Successfully");
                res.status(200).json({ message: "Updated Successfully" });
              })
              .catch((err) => {
                console.error("Error updating record", err);
                res.status(500).json({ message: "Error updating record" });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.error("Error updating record", err);
      res.status(500).json({ message: "Error updating record" });
    });
};
