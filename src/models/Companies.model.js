const sequelize = require("../../connection/connection");
const {Model, DataTypes, Op} = require("sequelize")

class Companies extends Model{};

Companies.init(
  {
    companies_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    owner_name:{
      type: DataTypes.STRING(100),
      allowNull: false
    },
    company_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    about_company:{
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    company_phone: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    company_email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    company_password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }

  },
  {
    tableName: "companies",
    sequelize,
    timestamps: true,
    createdAt: "add_date",
    updatedAt: false
  }
);

module.exports = Companies