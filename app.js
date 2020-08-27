const express = require('express')
const { config } = require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')
config()
require('./db')
require("./utils/razorpay")

const app = express()
// app.use(cookieParser());
app.use(bodyparser.json())
app.use(express.json())
app.use(
  cors() 
  // cors({
  //       origin: "http://localhost:3001",
  //       credentials: true,
  //       allowedHeaders: ["Content-Type"]
  //     })
)
// app.options('*', cors())

const userRoutes = require('./routes/userRoutes')
const apiRoutes = require('./routes/apiRoutes');
const adminRoutes = require("./routes/adminRoute");
app.use(userRoutes)
app.use(apiRoutes)
app.use(adminRoutes)


module.exports  = app