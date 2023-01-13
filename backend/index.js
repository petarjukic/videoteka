const { connection } = require("./config/db");
const bcrypt = require("bcrypt");
const { signJwt, verifyJwt } = require("./config/jwt");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Genre, Director, User, Role, Movie } = require("./models/models");

const init = async () => {
  try {
    await connection.authenticate();
    await User.sync({ alter: true });
    await Role.sync({ alter: true });
    await Movie.sync({ alter: true });
    await Genre.sync({ alter: true });
    await Director.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
init();
const app = express();
const api = express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 4000;

app.use("/api", api);

api.post("/login", async (req, res) => {
  const user = await User.findOne({
    include: Role,
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
  const user = await User.create({
    ...req.body,
  });

  user.setRole("052418e4-647d-49fd-ada3-ea4989682b28");

  return res.json(user);
});

api.post("/roles", async (req, res) => {
  console.log(req.body);
  const [role, created] = await Role.findOrCreate({
    where: {
      name: req.body.name,
    },
    defaults: {
      ...req.body,
    },
  });

  if (created) {
    return res.json(role);
  }
});
api.route("movies/:id").get(async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);

  console.log(movie);
});

api.post("/movies", async (req, res) => {
  const [movie, createdMovie] = await Movie.findOrCreate({
    where: { name: req.body.name },
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
  const genre = await Genre.findByPk(req.body.genre);
  movie.setDirector(director);
  movie.setGenre(genre);

  return res.json(movie);
});

api.get("/movies", async (req, res) => {
  const movies = await Movie.findAll({
    include: [Director, Genre],
  });
  return res.json(movies);
});

api.put("movies/:id", async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);

  if (movie) {
    await movie.update(req.body);
    return res.json(movie);
  } else {
    return res.status(404).json({ message: "Movie not found!" });
  }
});

api.delete("/movies/:id", async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);
  console.log(movie);
  if (movie) {
    await movie.destroy();
    return res.json(movie);
  } else {
    return res.status(404).json({ message: "Movie not found!" });
  }
});

api.post("/genres", async (req, res) => {
  const [genre, created] = await Genre.findOrCreate({
    where: { name: req.body.name },
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
  } else {
    return res.status(404).json({ message: "Genre not found!" });
  }
});

api.put("/genres/:id", async (req, res) => {
  const genre = await Genre.findByPk(req.params.id);

  if (genre) {
    await genre.update(req.body);
    return res.json(genre);
  } else {
    return res.status(404).json({ message: "Genre not found!" });
  }
});

api.delete("/genres/:id", async (req, res) => {
  const genre = await Genre.findByPk(req.params.id);

  if (genre) {
    await genre.destroy();
    return res.json(genre);
  } else {
    return res.status(404).json({ message: "Genre not found!" });
  }
});

api.get("/users", async (req, res) => {
  const users = await User.findAll({
    include: Role,
  });
  const role = await users[0];

  console.log(role);
  return res.json(users);
});

app.listen(port, () => {
  console.log("Running on port " + port);
});
