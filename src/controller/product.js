const path = require( "path" );
const sequelize = require( "../../connection/connection" );
const Product = require( "../models/Product.model" );
const Oder = require( "../models/Order.model" )
const fs = require( "fs" );
const jwt = require("jsonwebtoken")
const Companies = require( "../models/Companies.model" );
const Users = require( "../models/Users.model" );

////////////// GET PRODUCTS //////////

module.exports = {
  GETPRO: async ( req, res ) => {
    try {
      const pro = await Product.findAll( { raw: true } );
      res.status( 201 ).json( pro );
    } catch ( error ) {
      res.status( 404 ).json( error.message )
    }
  },
  
   ///////////// GET PRODUCTS  WITH USER //////////

GETPRODUCT_USER: async (req, res) => {
try {
const authHeader = req.headers.authorization;
console.log(authHeader);
  if ( !authHeader ) {
    return res.status( 401 ).json( { message: "Token yo'qku brat" } );
  };
  const token = authHeader.split( ' ' )[ 1 ];
  const decodedToken = jwt.verify( token, process.env.SEKRET_KEY3 );
  const user = await Companies.findOne( { where: { company_email: decodedToken.company_email } } );
  const companies_id = user.companies_id
  console.log(companies_id);
  if ( !user ) {
    return res.status( 401 ).json( { message: 'Invalid token' } );
  };
    const findCat = await Companies.findOne(
    {
      where: { companies_id: companies_id },
      include: Product
    } );
 res.status( 201 ).json( findCat );
} catch (error) {
  
}
},

  ///////////// GET PRODUCTS  WITH ID //////////
  GETPRO_ID: async ( req, res ) => {
    try {
      const { pro_id } = req.params;
      const product = await Product.findOne( {
        where: { pro_id: pro_id }
      } );
      if ( !product ) {
        res.status( 404 ).json( { message: 'Mahsulot topilmadi' } );
      } else {
        res.status( 200 ).json( product );
      }
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: 'Serverda xatolik yuz berdi' } );
    }
  },

  imgGet: async ( req, res ) => {
    try {
      const { file } = req.params
      // console.log( path.join(__dirname, ".."), "..","psth ");
      return res.sendFile( path.join( __dirname, "..", "..", "uploads", file ) )
    } catch ( error ) {
      // console.log(error.message);
    }
  },

  // http://localhost:1010/${}\/
  ////////////// POST PRODUCTS //////////

  POSTPRO: async ( req, res ) => {
    try {
      const authHeader = req.headers.authorization;
      console.log(authHeader);
      if ( !authHeader ) {
        return res.status( 401 ).json( { message: "sizda token yo'qku brat" } );
      }
      const token = authHeader.split( ' ' )[ 1 ];
      const decodedToken = jwt.verify( token, process.env.SEKRET_KEY3 );
      const user = await Companies.findOne( { where: { company_email: decodedToken.company_email } } );
      const companies_id = user.companies_id
      console.log( companies_id );
      if ( !user ) {
        return res.status( 401 ).json( { message: 'Invalid token' } );
      }  
      const { pro_name, pro_price, pro_description, category_id } = req.body;
      const { filename } = req.file;
      await Product.create( { companies_id, pro_name, pro_price, pro_description, category_id, pro_img: `/uploads/${filename}` } );
      res.status( 201 ).json( "SUCSESS" )
    } catch ( error ) {
      res.status( 404 ).json( error.message );
    }
  },

  POST_PRO: async (req, res) => {
    try {
      const { pro_name, pro_price, pro_description, category_id } = req.body;
      const { filename } = req.file;
      await Product.create( { pro_name, pro_price, pro_description, category_id, pro_img: `/uploads/${filename}` } );
      res.status( 201 ).json( "SUCSESS" )
    } catch (error) {
      res.status( 404 ).json( error.message );
    }
  },

  //////////// UPDATE PRODUCTS //////////

  UPDATEPRO: async ( req, res ) => {
    try {
      const { pro_id } = req.params;
      const { pro_name, pro_price, pro_description, category_id } = req.body
      const { filename } = req.file

      const imgs = await Product.findAll( { raw: true } );
      const findimg = imgs.find( ( data ) => data.pro_id == pro_id );
      if ( !findimg ) {
        res.send( {
          status: 404,
          message: "Bu id mavjud emas"
        } )
      };

      // fs.unlink( 'uploads/' + findimg.pro_img.split( "/" )[ 2 ], function ( err ) {
      //   if ( err ) {
      //     res.status( 500 ).send( 'Faylni o\'chirishda xatolik yuz berdi' );
      //   }
      // } );

      const update = await Product.findOne( { where: { pro_id } } );

      update?.update( { pro_name, pro_price, pro_description, category_id, pro_img: `/uploads/${filename}` } );
      res.status( 201 ).json( { message: "UPDATE" } );
    } catch ( error ) {
      res.status( 404 ).json( { message: error }, "kjhgfc" );
    }
  },

  ////////////// DELETE PRODUCTS //////////

  DELETEPRO: async ( req, res ) => {
    try {
      const { pro_id } = req.params
      const imgs = await Product.findAll( { raw: true } );
      const findimg = imgs.find( ( data ) => data.pro_id == pro_id );
      if ( !findimg ) {
        res.send( {
          status: 404,
          message: "Bu id mavjud emas"
        } )
      };

      fs.unlink( 'uploads/' + findimg.pro_img.split( "/" )[ 2 ], function ( err ) {
        if ( err ) {
          res.status( 500 ).send( 'Faylni o\'chirishda xatolik yuz berdi' );
        }
      } );
      await Product.destroy( { where: { pro_id } } )
      res.status( 201 ).json( { message: "DELETE" } );
    } catch ( error ) {
      res.status( 404 ).json( { message: error.message } );
    }
  },
};
