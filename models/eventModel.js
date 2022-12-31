const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const event = sequelize.define(
  "invitation",
  {
    // Model attributes are defined here
    host_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invitee_email: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    host_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = event;
