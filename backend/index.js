const { connection } = require("./config/db");
const bcrypt = require("bcrypt");
const { signJwt, verifyJwt } = require("./config/jwt");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {Genre, Director, User, Role, Movie, Order, OrderDetail} = require("./models/models");

const app = express();
const port = 4000;
const api = express.Router();

app.use("/api", api);
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


api.post("/login", async (req, res) => {
	const user = await User.findOne({
		where: { email: req.body.email },
	});
	if (user === null) {
		return res
			.status(404)
			.json({ message: "User not found! Please register first." });
	}
	if (bcrypt.compareSync(req.body.password, user.password)) {
		const token = signJwt(user.id);
		const newUser = { ...user.dataValues, token };
		return res.json(newUser);
	} else {
		return res.status(400).json({ message: "Invalid credentials!" });
	}
});

api.post("/register", async (req, res) => {
	const [user, created] = await User.findOrCreate({
		where: { email: req.body.email },
		defaults: {
			...req.body,
		},
	});
	if (created) {
		return res.json(user);
	}
});

api.post("/movies", async (req, res) => {
	const [movie, createdMovie] = await Movie.findOrCreate({
		where: { id: req.body.id },
		defaults: {
			...req.body,
		},
	});

	const [director, createdDirector] = await Director.findOrCreate({
		where: { name: req.body.director.name },
		defaults: {
			...req.body.director,
		},
	});

	if (createdMovie && createdDirector) {
		movie.setDirector(director);
		movie.setGenres(req.body.genres);
		return res.json(movie);
	}
});

api.get("/movies", async (req, res) => {
	const movies = await Movie.findAll();
	return res.json(movies);
});

api.put("movies/:id", async (req, res) => {
	const movie = await Movie.findByPk(req.params.id);

	if (movie) {
		await movie.update(req.body);
		return res.json(movie);
	}else{
		return res.status(404).json({ message: "Movie not found!" });
	}
});

api.get("movies/:id", async (req, res) => {
	const movie = await Movie.findByPk(req.params.id);

	if (movie) {
		return res.json(movie);
	}else{
		return res.status(404).json({ message: "Movie not found!" });
	}
});

api.delete("movies/:id", async (req, res) => {
	const movie = await Movie.findByPk(req.params.id);

	if (movie) {
		await movie.destroy();
		return res.json(movie);
	}else{
		return res.status(404).json({ message: "Movie not found!" });
	}
});

api.post("/genres", async (req, res) => {
	const [genre, created] = await Genre.findOrCreate({
		where: { id: req.body.id },
		defaults: {
			...req.body,
		},
	});
	if (created) {
		return res.json(genre);
	}

	return res.status(400).json({ message: "Genre already exists!" });
});

api.get("/genres", async (req, res) => {
	const genres = await Genre.findAll();
	return res.json(genres);
});

api.get("/genres/:id", async (req, res) => {
	const genre = await Genre.findByPk(req.params.id);

	if (genre) {
		return res.json(genre);
	}else{
		return res.status(404).json({ message: "Genre not found!" });
	}
});

api.put("/genres/:id", async (req, res) => {
	const genre = await Genre.findByPk(req.params.id);

	if (genre) {
		await genre.update(req.body);
		return res.json(genre);
	}else{
		return res.status(404).json({ message: "Genre not found!" });
	}
});

api.delete("/genres/:id", async (req, res) => {
	const genre = await Genre.findByPk(req.params.id);

	if (genre) {
		await genre.destroy();
		return res.json(genre);
	}else{
		return res.status(404).json({ message: "Genre not found!" });
	}
});

