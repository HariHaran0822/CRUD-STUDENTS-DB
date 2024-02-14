const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;
const studentsRoutes = require("./Routes/studentsRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", studentsRoutes);

app.listen(PORT, () => {
  console.log(`Server starts and working on ${PORT}`);
});
