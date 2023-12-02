const express = require("express");
const Sequelize = require('sequelize');
const {connect, sync} = require("./db");
const pageRoutes = require("./routes/page.routes");
const apiRoutes = require("./routes/api.routes");
const app = express();
const port = 3000;

//SET THE VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
// database stuff


app.use(express.json())
// const PGHOST ="ep-weathered-dust-86515705.us-east-2.aws.neon.tech";
// const PGDATABASE ="neondb";
// const PGUSER ="Danny-Mr";
// const PGPASSWORD ="W9OjlZeJk1rI";
// const PGPORT = "5432";
// const ENDPOINT_ID="ep-weathered-dust-86515705";

// // set up sequelize to point to our postgres database
// let sequelize = new Sequelize('PGDATABASE', 'PGUSER', 'PGPASSWORD', {
//   host: 'PGHOST',
//   dialect: 'postgres',
//   port: PGPORT,
//   dialectOptions: {
//     ssl: { rejectUnauthorized: false },
//   },
// });

// const User = sequelize.define("user", {
//   firstName: Sequelize.TEXT,
//   lastName: Sequelize.TEXT,
//   email: Sequelize.TEXT,
//   age: Sequelize.INTEGER,
//   company: Sequelize.INTEGER,

// });

// const Product = sequelize.define("products", {
//   description: Sequelize.TEXT,
//   upc: Sequelize.TEXT,
// });





// sequelize.sync({alter: true}).then(() => {
//   User.create({
//     firstName: "Bruce",
//     lastName: "Christie",
//     email: "bruce@home.com",
//     age: "99",
//   })


//   // User.findAll().then((data) => {
//   //   for (let i = 0; i < data.length; i++) {
//   //     console.log(data[i].firstName + data[i].lastName);
//   //   }
//   // });

// //   User.findAll({
// //     where: {firstName: "Bruce"},
// //     for (let i = 0; i < data.length; i++) {
// //       console.log(data[i].firstName + data[i].lastName);
// //     }
// //   });

// // User.findByPk(1).then((user) => {
// //     console.log(user.firstName);
// // });

// User.destroy({where: {id: 22}}).then (() => {
//   console.log("User Deleted.");
// }

// )}

//   // return all first names where id == 2
//   Name.findAll({
//     attributes: ['fName'],
//     where: {
//       id: 2,
//     },
//   }).then((data) => {
//     console.log('All first names where id == 2');
//     for (let i = 0; i < data.length; i++) {
//       console.log(data[i].fName);
//     }
//   });

//     User.then((user) => {
//       // you can now access the newly created Project via the variable project
//       console.log('success!');
//     })
//     .catch((error) => {
//       console.log('something went wrong!');
//     });

//     project.create({
//       description: "baseball",
//       upc: "hello123",
//     })

//     User.findAll().then
// });

// sequelize
//   .authenticate()
//   .then(() => {

//     console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.log('Unable to connect to the database:', err);
//   });

connect ();
sync();

// ROUTE HANDLING
app.use(pageRoutes);
app.use("/api", apiRoutes);

// LISTEN FOR REQUESTS!!!!
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
