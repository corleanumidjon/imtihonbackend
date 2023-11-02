const sequelize = require("../../connection/connection");
const Buyer = require("../models/Buyer.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  REGISTER_BUYER: async (req, res) => {
    try {
      const { buyer_name, buyer_email, buyer_password } = req.body;
      console.log(req.body);
      const chackEmail = await Buyer.findOne( { where: { buyer_email }});
      if(chackEmail) {
        return res.status( 404 ).json( "Bu email allaqachon ro'hatdan o'tgan" );
      };
      const saltRounds = 10;
      const plaintextPassword = buyer_password;
      const salt = bcrypt.genSaltSync( saltRounds );
      const hashedPassword = bcrypt.hashSync( plaintextPassword, salt );
      await Buyer.create( { buyer_name, buyer_email, buyer_password:hashedPassword } );
      res.status( 201 ).json( "Tabriklaymiz siz ro'yxatdan o'tdingiz!!!" );
    } catch (error) {
      res.status( 404 ).json( error.message );
    }
  },
  LOGIN_BUYER: async ( req, res ) => {
    try {
      const { buyer_email, buyer_password } = req.body;
      console.log( req.body );
      const user1 = await Buyer.findOne({ where: {buyer_email}});
      if ( !user1 ) {
        return res.status( 404 ).json( { error: 'Foydalanuvchi topilmadi' } );
      }
    
      const isPasswordValid = await bcrypt.compare( buyer_password, user1.buyer_password );
      if ( !isPasswordValid ) {
        return res.status( 401 ).json( { error: 'Parol noto\'g\'ri' } );
      };
      
      const token = jwt.sign( { buyer_email: user1.buyer_email, buyer_password: user1.buyer_password }, process.env.SEKRET_KEY2, { expiresIn: "1d" } );
      res.status( 201 ).json( { user1, token } );
    } catch ( error ) {
      res.status( 404 ).json( error.message )
    }
  },
}