const { Router } = require( "express" );
const { GETPRO, POSTPRO, UPDATEPRO, DELETEPRO, imgGet, GETPRO_ID, GETPRODUCT_USER, POSTPRO_ADMIN, POST_PRO } = require( "../controller/product" );
const upload = require( "../lib/multer" );
const { POSTCATEGORY, GETCATEGORY, UPDATECATEGORY, DELETE_CATEGORY, GET_CATEGORIES_PRODUCTS } = require( "../controller/category" );
const { POSTUSERS, GETUSERS, UPDATEUSERS, LOGIN } = require( "../controller/auth" );
const { POST_ORDER, GETORDER, DELETE_ORDER, GETOREDER_USER } = require( "../controller/order" );
const authMiddleware = require( "../middleware/check.admin" );
const { REGISTER_BUYER, LOGIN_BUYER } = require( "../controller/buyer" );
const { PARTNER_OFFER, DELETE_OFFER, GET_OFFER } = require( "../controller/partner" );
const { REGISTER_COMPANY, LOGIN_COMPANY } = require( "../controller/companies" );

const routes = Router();
//\/\/\/\/\/\/\/\ PRODUCT /\/\//\/\/\/\/\/\\
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\\
routes.get("/getprdocut_user", GETPRODUCT_USER)
routes.get( "/getproduct", GETPRO );
routes.get( "/get_pro_id/:pro_id", GETPRO_ID )
routes.post( "/postproduct", upload.single( "pro_img" ), POSTPRO );
routes.post( "/post_pro", upload.single( "pro_img" ), POST_PRO)
routes.put( "/putproduct/:pro_id", upload.single( "pro_img" ), UPDATEPRO );
routes.delete( "/deleteproduct/:pro_id", DELETEPRO );
// http://localhost:1010//
routes.get( "/uploads/:file", imgGet );


//\/\/\/\/\/\/\/\ CATEGORY /\/\//\/\/\/\/\/\\
//\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\\

routes.post( "/post_category", POSTCATEGORY );
routes.get( "/get_category", GETCATEGORY );
routes.put( "/update_category/:category_id", UPDATECATEGORY );
routes.delete( "/delete_category/:category_id", DELETE_CATEGORY );
routes.get( "/get_category_with_products/:category_id", GET_CATEGORIES_PRODUCTS );

//\/\/\/\/\/\/\/\ USERS /\/\//\/\/\/\/\/\\
//\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\\

routes.post( "/post_admin", POSTUSERS );
routes.get( "/get_users", GETUSERS );
routes.put( "/update_users/:user_id", UPDATEUSERS );
routes.post( "/login_admin", LOGIN );

//\/\/\/\/\/\/\/\ ORDER /\/\//\/\/\/\/\/\\
//\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\\

routes.post( "/post_order", POST_ORDER );
routes.get( "/get_order", GETORDER );
routes.delete( "/delete_order/:order_id", DELETE_ORDER );


//\/\/\/\/\/\/\/\ BUYER /\/\//\/\/\/\/\/\\
//\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\\

routes.post("/post_buyer", REGISTER_BUYER);
routes.post("/login_buyers", LOGIN_BUYER);
routes.get("/get_order_user", GETOREDER_USER);


//\/\/\/\/\/\/\/\ PARTNER /\/\//\/\/\/\/\/\\
//\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\\
routes.post("/partner_offer", PARTNER_OFFER);
routes.delete("/delete_offer/:partner_id", DELETE_OFFER);
routes.get("/get_offer", GET_OFFER);



//\/\/\/\/\/\/ PARTNER COMPANY /\/\//\/\\\
//\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\\

routes.post("/post_company", REGISTER_COMPANY);
routes.post("/login_company", LOGIN_COMPANY);



module.exports = routes;