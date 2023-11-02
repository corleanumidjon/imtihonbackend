const sequelize = require("../../connection/connection");
const {Model, DataTypes, Op} = require("sequelize");
const { all } = require( "../routes/product.routes" );

class Users extends Model { };


Users.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING( 60 ),
    },
    companies_id:{
     type: DataTypes.INTEGER,
     allowNull: false
    },
    company_email: {
       type: DataTypes.STRING(100),
       allowNull: false
    },
    password: {
      type: DataTypes.INTEGER,
    }
  },
  {
    tableName: "users",
    sequelize,
    createdAt: "come_date",
    updatedAt: false,
  } );

module.exports = Users;