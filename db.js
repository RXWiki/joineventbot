const { Sequelize } = require("sequelize")
const DATABASE = new Sequelize(
    process.env.POSTGRES_DATABASE,
    process.env.POSTGRES_USERNAME,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        dialect: process.env.DIALECT
    }
);

module.exports = DATABASE;