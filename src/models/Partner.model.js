const sequelize = require("../../connection/connection");
const {Model, DataTypes, Op} = require("sequelize");


class Partner extends Model{};

Partner.init(
  {
partner_id: {
  type: DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true
},
partner_name: {
  type: DataTypes.STRING(100),
  allowNull: false
},
partner_company: {
  type: DataTypes.STRING(150),
  allowNull: false
},
partner_description: {
  type: DataTypes.STRING(500),
  allowNull: false
},
partner_phone: {
  type: DataTypes.STRING(100),
  allowNull: false
},
partner_email: {
  type: DataTypes.STRING(100),
  allowNull: false
}

  },
  {
    tableName: "partner",
    sequelize,
    timestamps: true,
    updatedAt: "update_at",
    createdAt: false
  }
);

module.exports = Partner
