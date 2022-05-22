const dealWithData = require("../helper/dealWithData.helper")
const home = (req, res) => {
    const data = dealWithData.readFormJSON("database/user.json")
    res.render("home", {
        pagetitel: "home page - user app",
        hasData: data.length,
        data
    })
}
const add = (req, res) => {
    res.render("add", {
        pagetitel: "add user - user app"
    })
}
const addLogicGet = (req, res) => {
    const user = { ...req.query, id: Date.now(), transactions:[] }
    const data = dealWithData.readFormJSON("database/user.json")
    data.push(user)
    dealWithData.writeToJSON(data, "database/user.json")
    res.redirect('/')
}
const single = (req, res) => {
    const id = req.params.id
    const user = dealWithData.readFormJSON("database/user.json").find(d => d.id == req.params.id)
    // console.log(user);
    res.render("single", {
        pagetitel: "user Data",
        user,
    })
}
const addTransaction = (req, res) => {
    chSelect = ["Add", "withdraw"],
    res.render("transactinons", {
        pageTitle: "add user -bank app",
        chSelect
    })
}
const addTransactionLogic = (req, res) => {
    const data = dealWithData.readFormJSON("database/user.json")
    const customerIndex = dealWithData.readFormJSON("database/user.json").findIndex(d => d.id == req.params.id)
    data[customerIndex].transactions.push(req.body)
    dealWithData.writeToJSON(data, "database/user.json")
    res.redirect(`/users/${data[customerIndex].id}`)

}



module.exports = {
    home, add, addLogicGet, single, addTransactionLogic, addTransaction
}