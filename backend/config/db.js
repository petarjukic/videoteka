const { Sequelize } = require("sequelize");

const db = "mysql://stipo:Liberato0192!@mysql.udruga-liberato.hr/avp";
module.exports.connection = new Sequelize(db);
