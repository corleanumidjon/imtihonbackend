const express = require("express");
const sequelize = require( "../connection/connection" );
const routes = require( "./routes/product.routes" );
const Realtion = require("./schema/relation.schema");
const cors = require("cors")

require("dotenv").config();

// { origin: [ "http://127.0.0.1:5500" ] }

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);


const PORT = process.env.PORT || 3000;

const bootstrap = async() => {
  await sequelize.authenticate({
    logging: false,
  }
  );
  Realtion()
  await sequelize.sync(
    {
      alter: true,
      // force: true
    }
  )
  console.log("serverga ulandi ...");

  app.listen(PORT, () => {
    console.log("Server... " + PORT);
  })
}; bootstrap()
