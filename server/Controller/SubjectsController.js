const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Students",
  password: "postgres",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Error connecting to database: ", err));

exports.getAllSubjects = (req, res) => {
  const query = "SELECT * FROM master_tbl_subjects";
  client.query(query).then((result) => {
    if (result.rows.length == 0) {
      res.status(404).json({ message: "No Records Found" });
    }
    console.log("record");
    res.json(result.rows);
  });
};
