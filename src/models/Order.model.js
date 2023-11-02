const { Model, Op, DataTypes } = require( "sequelize" );
const sequelize = require( "../../connection/connection" );

class Order extends Model { };

Order.init(
  {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    buyer_id:{
     type: DataTypes.INTEGER
    },
    order_name: {
      type: DataTypes.STRING( 100 ),
      allowNull: false,
    },
    order_price: {
      type: DataTypes.STRING( 100 ),
    },
    order_description: {
      type: DataTypes.STRING
    },
    order_img: {
      type: DataTypes.TEXT
    },
    user_name: {
       type: DataTypes.STRING(100),
       allowNull: false
    },
    user_phone: {
      type: DataTypes.STRING(100),
      allowNull: false
    }

  },
  {
    tableName: "order_pro",
    sequelize,
    timestamps: true,
    updatedAt: false,
    createdAt: "add_date"
  }
);

module.exports = Order;
