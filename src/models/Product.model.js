const {Model, Op, DataTypes} = require("sequelize");
const sequelize = require("../../connection/connection");

class Product extends Model {};

Product.init(
  {
    pro_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // companies_id:{
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    pro_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    pro_price: {
      type: DataTypes.STRING(100),
    },
    pro_description:{
      type: DataTypes.STRING(5000)
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,   
    },
    pro_img:{
      type: DataTypes.TEXT
    }

  },
  {
    tableName: "products",
    sequelize,
    timestamps: true,
    updatedAt: "update_at",
    createdAt: "created_at"
  }
);

module.exports = Product;

