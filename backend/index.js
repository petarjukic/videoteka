const { connection } = require("./config/db");
const bcrypt = require("bcrypt");
const { signJwt, verifyJwt } = require("./config/jwt");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {Genre, Director, User, Role, Movie, Order, OrderDetail} = require("./models/models");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(verifyJwt);

app.listen(port, () => {
	console.log("Running on port " + port);
});


const init = async () => {
	try {
        await connection.authenticate();
        await User.sync({ alter: true });
        await Role.sync({ alter: true });
        await Genre.sync({ alter: true });
        await Director.sync({ alter: true });
        await Movie.sync({ alter: true });
        await Order.sync({ alter: true });
        await OrderDetail.sync({ alter: true });
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};
init();


app.post("/login", async (req, res) => {
	const user = await User.findOne({
		where: { email: req.body.email },
	});
	if (user === null) {
		return res
			.status(404)
			.json({ message: "User not found! Please register first." });
	}
	if (bcrypt.compareSync(req.body.password, user.password)) {
		const token = signJwt(user.id, user.role);
		const newUser = { ...user.dataValues, token };
		return res.json(newUser);
	} else {
		return res.status(400).json({ message: "Invalid credentials!" });
	}
});

app.post("/register", async (req, res) => {
	const [user, created] = await User.findOrCreate({
		where: { email: req.body.email },
		defaults: {
			role: "buyer",
			...req.body,
		},
	});
	if (created) {
		return res.json(user);
	}
});