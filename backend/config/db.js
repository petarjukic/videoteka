const { Sequelize } = require("sequelize");

const db = "mysql://stipo:Liberato0192!@mysql.liberato.internal/avp";
module.exports.connection = new Sequelize(db);
