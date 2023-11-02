const jwt = require("jsonwebtoken");
const Users = require("../models/Users.model");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if ( !authHeader ) {
      return res.status( 401 ).json( { message: 'Authorization header required' } );
    }
    const token = authHeader.split( ' ' )[ 1 ];
    const decodedToken = jwt.verify( token, process.env.SEKRET_KEY );
    const user = await Users.findOne( { where: { password: decodedToken.password } } );
    if ( !user ) {
      return res.status( 401 ).json( { message: 'Invalid token' } );
    }
    req.user = user;
    next();
  } catch (error) {
    console.error( error );
    return res.status( 401 ).json( { message: 'Invalid token' } );
  }
};

module.exports = authMiddleware;