const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Tasks = sequelize.define("tasks", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING},
    text: {type: DataTypes.STRING},
    status: {type: DataTypes.INTEGER},
    image_path: {type: DataTypes.TEXT}
})

module.exports = {Tasks}