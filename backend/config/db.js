const { Sequelize } = require("sequelize");

const db = "mysql://stipo:Liberato0192!@192.168.66.31/avp";
module.exports.connection = new Sequelize(db);
