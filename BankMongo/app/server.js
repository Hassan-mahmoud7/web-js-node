
const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../resources/views"))
hbs.registerPartials(path.join(__dirname, "../resources/layout"))
const userRoutes = require('../routes/user.routes')
app.use(express.urlencoded({ extended: true }))
app.use(userRoutes)
app.get("*", (req, res) => res.render("err404", { pagetitel: "Not found" }))
app.post("*", (req, res) => res.render("err404", { pagetitel: "Not found" }))
module.exports = app