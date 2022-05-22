require("dotenv").config()
const express = require("express")
const app = express()
const hbs = require("hbs")
const path =require("path")

app.set("view engine", "hbs")

app.set( "views", path.join(__dirname,"../resources/views"))
hbs.registerPartials(  path.join(__dirname,"../resources/layout"))
 const userRoutes = require('../routes/user.routes')
 app.use(userRoutes)

module.exports = app