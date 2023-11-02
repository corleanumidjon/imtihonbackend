const sequelize = require("../../connection/connection");
const Category = require("../models/Category.model");
const Product = require( "../models/Product.model" );



/////////// POST CATEGORY //////////////

module.exports = {
  POSTCATEGORY: async (req, res) => {
    try {
      const {category_name } = req.body;
      await Category.create( {category_name } );
      res.status( 201 ).json( "SUCSESS" )
    } catch ( error ) {
      res.status( 404 ).json( error.message )
    }
  },

  GETCATEGORY: async (req, res) => {
    try {
      const allcategory = await Category.findAll( { raw: true } );
      res.status( 201 ).json( allcategory );
    } catch ( error ) {
      res.status( 404 ).json( error.message )
    }
  },

  UPDATECATEGORY: async (req, res) => {
    try {
      const { category_id } = req.params;
      const { category_name } = req.body;

      const update = await Category.findOne( { where: { category_id } } );

      update?.update( { category_name } );
      res.status( 201 ).json( { message: "UPDATE CATEGORY" } );
    } catch ( error ) {
      res.status( 404 ).json( { message: error } );
    }
  },
  
  DELETE_CATEGORY: async (req, res) => {
    try {
      const { category_id } = req.params;
      await Category.destroy( { where: { category_id } } )
      res.status( 201 ).json( { message: "DELETE" } );
    } catch ( error ) {
      res.status( 404 ).json( { message: error.message } );
    }
  },


  GET_CATEGORIES_PRODUCTS: async (req, res) => {
    try {
      const findCat = await Category.findOne(
        {
          where: { category_id: req.params.category_id },
          include: Product
        } );
      res.status( 201 ).json( findCat );
    } catch ( error ) {
      res.status( 404 ).json( error.message )
    }
  }
}