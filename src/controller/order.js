const sequelize = require( "../../connection/connection" );
const Buyer = require( "../models/Buyer.model" );
const Order = require( "../models/Order.model" );
const jwt = require( "jsonwebtoken" )
module.exports = {
  POST_ORDER: async ( req, res ) => {
    try {
      const authHeader = req.headers.authorization;
      console.log(authHeader);
      if ( !authHeader ) {
        return res.status( 401 ).json( { message: 'Authorization header required' } );
      }
      const token = authHeader.split( ' ' )[ 1 ];
      const decodedToken = jwt.verify( token, process.env.SEKRET_KEY2 );
      const user = await Buyer.findOne( { where: { buyer_email: decodedToken.buyer_email } } );
      const buyer_id = user.buyer_id
      console.log( buyer_id );
      if ( !user ) {
        return res.status( 401 ).json( { message: 'Invalid token' } );
      }

      const { order_name, order_price, order_description, order_img, user_name, user_phone } = req.body;
      await Order.create( { buyer_id, order_name, order_price, order_description, order_img, user_name, user_phone } );
      res.status( 201 ).json( "SUCSESS" )
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: 'Serverda xatolik yuz berdi' } );
    }
  },

  GETORDER: async ( req, res ) => {
    try {
      const allorder = await Order.findAll( { raw: true } );
      res.status( 201 ).json( allorder );
    } catch ( error ) {
      res.status( 404 ).json( error.message )
    }
  },

  GETOREDER_USER: async ( req, res ) => {
    try {
      const authHeader = req.headers.authorization;
      if(!authHeader){
          return res.status( 401 ).json( { message: "Token yo'qku brat" } );
      };
      const token = authHeader.split( ' ' )[ 1 ];
      const decodedToken = jwt.verify( token, process.env.SEKRET_KEY2 );
      const user = await Buyer.findOne( { where: { buyer_email: decodedToken.buyer_email } } );
      const buyer_id = user.buyer_id
      console.log(buyer_id);
      if ( !user ) {
        return res.status( 401 ).json( { message: 'Invalid token' } );    
      };
      const findCat = await Buyer.findOne(
        {
          where: { buyer_id: buyer_id },
          include: Order
        } );
      res.status( 201 ).json( findCat );
    } catch ( error ) {
      res.status( 404 ).json( { message: error.message });
    }
  },

  DELETE_ORDER: async ( req, res ) => {
    try {
      const { order_id } = req.params;
      console.log(req.params);
      await Order.destroy( { where: { order_id } } )
      res.status( 201 ).json( { message: "DELETE" } );
    } catch ( error ) {
      res.status( 404 ).json( { message: error.message } );
    }
  },
}

