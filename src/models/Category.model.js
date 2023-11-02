const { Model, Op, DataTypes } = require( "sequelize" );
const sequelize = require( "../../connection/connection" );

class Category extends Model { };

Category.init(
  {
    category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING( 100 ),
      allowNull: false,
    }
  },
  {
    tableName: "category",
    sequelize,
    createdAt: false,
    updatedAt: false
  }
);

module.exports = Category;
