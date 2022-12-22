const { DataTypes } = require("sequelize");
const { connection } = require("../config/db");
const bcrypt = require("bcrypt");

const User = connection.define("User", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const Role = connection.define("Role", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

const Movie = connection.define("Movie", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    oscar: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

const Order = connection.define("Order", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
});

const OrderDetail = connection.define("OrderDetail", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

const Director = connection.define("Director", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

const Genre = connection.define("Genre", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true, 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

User.hasOne(Role);
Role.belongsTo(User);
Movie.hasOne(Director);
Movie.hasOne(Genre);
Director.belongsTo(Movie);
Genre.belongsTo(Movie);
Order.belongsToMany(Movie, { through: OrderDetail });
Movie.belongsToMany(Order, { through: OrderDetail });
Order.hasOne(User);
User.belongsTo(Order);

User.beforeCreate((user) => {
	const hashedPassword = bcrypt.hashSync(user.password, 5);
	user.password = hashedPassword;
});

module.exports = {User, Role, Movie, Order, OrderDetail, Director, Genre};
