const sequelize = require("../../connection/connection");
const Partner = require("../models/Partner.model");


module.exports = {
  PARTNER_OFFER: async (req, res) => {
    try {
      const { partner_name, partner_company, partner_description, partner_phone, partner_email } = req.body;
      await Partner.create( { partner_name, partner_company, partner_description, partner_phone, partner_email } );
      res.status( 201 ).json( "Siz ro'yxatga olindingiz tez orada adminlarimiz siz bilan a'loqaga chiqishadi!!!" );
    } catch (error) {
      res.status( 404 ).json( error.message );
    }
  },
  DELETE_OFFER: async (req, res) => {
    try {
      const { partner_id } = req.params;
      await Partner.destroy( { where: { partner_id } } )
      res.status( 201 ).json( { message: "DELETE OFFER" } );
    } catch ( error ) {
      res.status( 404 ).json( { message: error.message } );
    }
  },

  GET_OFFER: async ( req, res ) => {
    try {
      const All_offer = await Partner.findAll( { raw: true } );
      res.status( 201 ).json( All_offer );
    } catch ( error ) {
      res.status( 404 ).json( error.message )
    }
  },
}
