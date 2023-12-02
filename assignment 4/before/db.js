const Sequelize = require("sequelize");
// Do not expose your Neon credentials to the browser
// .env
const PGHOST ="ep-weathered-dust-86515705.us-east-2.aws.neon.tech";
const PGDATABASE ="neondb";
const PGUSER ="Danny-Mr";
const PGPASSWORD ="W9OjlZeJk1rI";
const PGPORT = "5432";
const ENDPOINT_ID="ep-weathered-dust-86515705";

let sequelize = new Sequelize (PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    dialect: "posgres", 
    port: 5432,
    dialectOptions: {
        ssl: {rejectUnauthorized: false },
    },

});
 const User = sequelize.define("users", {
    firstName: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
    },
    lastName: Sequelize.Text,
    email: Sequelize.Text,
    password: Sequelize.TEXT,
    company: Sequelize.TEXT,

 });

async function sync() {
    await sequelize.sync({alter: true});
}



 async function connect () {
    try {
        await sequelize.authenticate();
        console.log("connection has been established successfully.");

    }catch (err) {
        console.log("Unable to connect to database.". err);
    }
 }