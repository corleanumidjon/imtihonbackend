const sequelize = require("../../connection/connection");
const Users = require("../models/Users.model");
const jwt = require("jsonwebtoken");

module.exports = {
  POSTUSERS : async (req, res) => {
    try {
      const { username, password, companies_id, company_email } = req.body;
      console.log(req.body);
      await Users.create( { username, password, companies_id, company_email })
      res.status( 201 ).json( "Yangi Admin qo'shildi." )
    } catch (error) {
      res.status( 404 ).json( error.message )
    }
  },
  GETUSERS: async ( req, res ) => {
    try {
      const allgroup = await Users.findAll();
      res.status( 201 ).json( allgroup )
    } catch ( error ) {
      res.status( 404 ).json( error.message );
    }
  },
  UPDATEUSERS: async ( req, res ) => {
    try {
      const { user_id } = req.params;
      const { username, password } = req.body;
      const update = await Users.findOne( { where: { user_id } } );
      update?.update( { username, password } );
      res.status( 201 ).json( { message: "UPDATE ADMIN" } );
    } catch ( error ) {
      res.status( 404 ).json( { message: error } );
    }
  },

  LOGIN: async (req, res) => {
    try {
      const { company_email, password } = req.body;  
      console.log(req.body);
      const user1 = await Users.findOne(
        {
          where: {
            company_email: company_email,
            password: password
          }
        }
      );
      const token = jwt.sign( { company_email: user1.company_email, password: user1.password }, process.env.SEKRET_KEY3, {expiresIn: "1d"});
      res.status( 201 ).json( { user1, token } );
    } catch (error) {
      res.status( 404 ).json( error.message )
    }
  },
}