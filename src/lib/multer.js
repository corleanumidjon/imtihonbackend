const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage( {
  destination: function ( req, file, cb ) {
    cb( null, path.join(process.cwd(), "uploads") )
  },
  filename: function ( req, file, cb ) {
    console.log(file);
    const uniqueSuffix = Date.now() + file.originalname;
    cb( null, uniqueSuffix )
  }
} )

const upload = multer( { storage: storage } );
module.exports = upload;