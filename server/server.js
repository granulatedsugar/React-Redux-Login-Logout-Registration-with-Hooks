const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors());
app.use(express.json(corsOptions)); // parse request of content type - application/json
app.use(express.urlencoded({ extended: true })); // parse request of content type - application/x-www-form-urlencoded
app.get("/", (req, res) => {
  res.json({ message: "Hello! Server initiated." });
});

// Set Routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
// Set PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

// // CREATE STARTING ROLES
// const db = require("./app/models");
// const Role = db.role;
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync DB");
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });
//   Role.create({
//     id: 2,
//     name: "moderator",
//   });

//   Role.create({
//     id: 3,
//     name: "admin",
//   });
//   Role.create({
//     id: 4,
//     name: "shopmanager",
//   });
//   Role.create({
//     id: 5,
//     name: "specialist",
//   });
// }
