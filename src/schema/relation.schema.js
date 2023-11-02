const Buyer = require( "../models/Buyer.model" );
const Category = require( "../models/Category.model" );
const Companies = require( "../models/Companies.model" );
const Order = require( "../models/Order.model" );
// const Order = require( "../models/Order.model" );
// const OrderProduct = require( "../models/Order.productmodel" );
const Product = require( "../models/Product.model" );



// Order.belongsToMany(Product, {through: OrderProduct});
// Product.belongsToMany(Order, {through: OrderProduct});


const Realtion = () => {
Category.hasMany( Product, {
  foreignKey:"category_id" 
});
Product.belongsTo(Category, {
  foreignKey: "category_id"
});

Buyer.hasMany(Order, {
  foreignKey: "buyer_id"
});

Order.belongsTo(Buyer, {
  foreignKey: "buyer_id"
});


Companies.hasMany(Product, {
  foreignKey: "companies_id"
});

Product.belongsTo(Companies, {
  foreignKey: "companies_id"
})
};


module.exports = Realtion;