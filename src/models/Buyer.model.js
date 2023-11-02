const sequelize = require("../../connection/connection");
const {Model, DataTypes, Op} = require("sequelize");

class Buyer extends Model{};



Buyer.init(
  {
    buyer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    buyer_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    buyer_email: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    buyer_password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "buyer",
    sequelize,
    timestamps: true,
    updatedAt: "update_at",
    createdAt: false
  }
);

module.exports = Buyer;