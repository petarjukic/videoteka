const { connection } = require("./config/db");
const bcrypt = require("bcrypt");
const { signJwt, verifyJwt } = require("./config/jwt");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log("Running on port " + port);
});


const init = async () => {
	try {
		await connection.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};
init();
