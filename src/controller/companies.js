const sequelize = require("../../connection/connection");
const Companies = require("../models/Companies.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  REGISTER_COMPANY: async (req, res) => {
    try {
      const { owner_name, company_name, about_company, company_phone, company_email, company_password } = req.body;
      const chackEmail = await Companies.findOne( { where: { company_email } } );
      if ( chackEmail ) {
        return res.status( 404 ).json( "Bu email allaqachon ro'hatdan o'tgan" );
      };
      const saltRounds = 10;
      const plaintextPassword = company_password;
      const salt = bcrypt.genSaltSync( saltRounds );
      const hashedPassword = bcrypt.hashSync( plaintextPassword, salt );
      await Companies.create( { owner_name, company_name, about_company, company_phone, company_email, company_password: hashedPassword } );
      res.status( 201 ).json( "Yangi hamkor kompanya qo'shildi!!!" );
    } catch (error) {
      res.status( 404 ).json( error.message );
    }
  },

  LOGIN_COMPANY: async (req, res) => {
    try {
      const { company_email, company_password } = req.body;

      const company1 = await Companies.findOne({where: {company_email}});
      if(!company1){
        return res.status( 404 ).json( { error: 'Foydalanuvchi kompanya topilmadi' } );
      };

      const isPasswordCom = await bcrypt.compare(company_password, company1.company_password);
      if(!isPasswordCom){
        return res.status( 401 ).json( { error: 'Parol noto\'g\'ri' } );
      }

      const token = jwt.sign( { company_email: company1.company_email, company_password: company1.company_password }, process.env.SEKRET_KEY3, {expiresIn: "1d"});
      res.status(201).json({company1, token}); 
    } catch (error) {
      res.status( 404 ).json( error.message )
    }
  }
}

// const sequelize = require( "../../connection/connection" );
// const Buyer = require( "../models/Buyer.model" );
// const bcrypt = require( "bcrypt" );
// const jwt = require( "jsonwebtoken" );

// module.exports = {
//   LOGIN_BUYER: async ( req, res ) => {
//     try {
//       const { buyer_email, buyer_password } = req.body;
//       console.log( req.body );
//       const user1 = await Buyer.findOne( { where: { buyer_email } } );
//       if ( !user1 ) {
//         return res.status( 404 ).json( { error: 'Foydalanuvchi topilmadi' } );
//       }

//       const isPasswordValid = await bcrypt.compare( buyer_password, user1.buyer_password );
//       if ( !isPasswordValid ) {
//         return res.status( 401 ).json( { error: 'Parol noto\'g\'ri' } );
//       };


//       const token = jwt.sign( { buyer_email: user1.buyer_email, buyer_password: user1.buyer_password }, process.env.SEKRET_KEY2, { expiresIn: "1d" } );
//       res.status( 201 ).json( { user1, token } );
//     } catch ( error ) {
//       res.status( 404 ).json( error.message )
//     }
//   },
// }