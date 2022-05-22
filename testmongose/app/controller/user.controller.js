const userModel = require('../../database/models/user.model')
const dbCon = require('../../database/connetDB')
const ObjectId = require("mongodb").ObjectId
class User {
    static add = (req, res) => {
        res.render("add", { pagetTitle: "add new user" })
    }
    static addLogic = async (req, res) => {
        try {
            const user = new userModel(req.body)
            await user.save()
            res.redirect("/")
        }
        catch (e) {
            console.log(e);
            res.render("err404", {
                pageTitle: "Error in Database",
                errMag: e.message
            })
        }

    }
    static showAll = async (req, res) => {
        try {
            const users = await userModel.find()
            res.render("all", {
                pagetTitle: "add new user",
                users,
                hasUsers: users.length
            })
        } catch (e) {
            res.render("error404", {
                pageTitle: "Error in Database",
                errMag: e.message
            })

        }

    }
    static showSingle = async (req, res) => {

        // dbCon((err, db) => {
            // if (err) res.send(err)
            // db.collection("data").findOne({ _id: new ObjectId(req.params.id) },
                // (error, users) => {
                    // if (error) res.send(error)
                    // res.render("single", {
                        // pagetTitle: "add new user",
                        // users,

                    // })
                // })
        // })
        try{
            const user = await userModel.findById(req.params.id)
            res.render("single", {
                pageTitle:user?`user ${user.name} data`:"user not found", 
                user
            })
        }
        catch(e){
            res.render("err404", {
                pageTitle:"error in db",
                errMsg:e.message
            })
        }

    }

    static edit = async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id)
            res.render("edit", {
                pageTitle: user ? `user${user.name} data` : "user not found",
                user
            })
        }
        catch (e) {
            res.render("err404", {
                pageTitle: "Error in Database",
                errMag: e.message
            })

        }
    }



    static editLogic = (req, res) => {
        dbCon((err, db)=>{
        if(err) res.render("err404", {pageTitle:"database error", errMsg:"database error"})
        db.collection("data").updateOne(
        {_id:new ObjectId(req.params.id)},
        {$set: req.body} //$inc:{age:10}
        )
        .then(()=>res.redirect(`/show/${req.params.id}`))
        .catch((e)=>{res.render("err404", {pageTitle:"err in update", errMsg:e.message})})
        
        })        
    }
    static del = async (req, res) => {
        try {
            await userModel.findByIdAndDelete(req.params.id)
            res.redirect("/")
        }
        catch (e) {
            res.render("err404", {
                pageTitle: "Error in db",
                errMag: e.message
            })

        }
    }
}
module.exports = User