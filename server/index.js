require("dotenv").config()
const express = require('express')
const sequelize = require('./db')
const models = require("./models/models")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const router = require("./routes/index")
const errorHandler = require("./middleware/ErrorHandlingMiddleware")
const path = require("path")
const https = require('https');
const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use("/api", router)
app.use(errorHandler)


const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync(path.resolve(__dirname,"../ssl/key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname,"../ssl/cert.pem")),
}, app);



const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync();
    httpServer.listen(80, () => {
        console.log('HTTP Server running on port 80');
    });
    
    httpsServer.listen(port, () => {
        console.log('HTTPS Server running on port '+port);
    });
  } catch (error) {
    console.log(error)
  }
} 

start();

