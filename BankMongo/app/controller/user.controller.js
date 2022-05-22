// const dealWithData = require("../helper/dealWithData.helper")
const dbCon = require("../../database/connetDB")
const ObjectId = require("mongodb").ObjectId

class User {
    static home = (req, res) => {
        dbCon((err, db)=>{
            if(err) res.send(err)
            db.collection("data").find().toArray((error, users)=>{
                if(error) res.send(error)
                res.render("home", {
                    pagetTitle:"add new user", 
                    users,
                    hasUsers: users.length
                })
            })
        })
    }
    static add = (req, res) => {
        res.render("add", {
            pagetitel: "add user - user app"
        })
    }
    static addLogicGet = (req, res) => {
        const user = {...req.body, id: Date.now(), transactions:[]}
        dbCon((err, db) => {
            if (err) res.send(err)
            db.collection("data").insertOne(user)
                .then(() => res.redirect("/"))
                .catch((e) => res.send(e))
        })
    }
    static single = (req, res) => {
        
        dbCon((err, db) => {
            if(err) res.send(err)
            db.collection("data").findOne({_id:new ObjectId (req.params.id)},
                (error, users)=>{
                if(error) res.send(error)
                res.render("single", {
                    pagetTitle:"add new user", 
                    users,
                  
                })
            })
        })
        
    }
    static addTransaction = (req, res) => {
        dbCon((err, db)=>{
            try{
            if(err) res.send(err)
            chSelect = ["Add", "withdraw"],
            db.collection("data").findOne({_id: new ObjectId(req.params.id)}, 
                (error, user)=>{
                if(error) res.send(error)
                res.render("transactinons", {
                    pageTitle:user?`transactinons user ${user.name} data`:"user not found", 
                    user
                })
            }
            )}
            catch(e){
                res.render('err404',
                {pagetTitle:"invalid id",errMsg:"invalid id format"}
                )
            }
            
        })
    }
    static addTransactionLogic = (req, res) => {
        dbCon((err, db)=>{
            if(err) res.render("err404", {pageTitle:"database error", errMsg:"database error"})
            const customerIndex = dealWithData.readFormJSON("database/connetDB.js")
            db.collection("data").updateOne(
                {_id:new ObjectId(req.params.id)},
                {$set: req.body} //$inc:{age:10}
            )
            .then(()=>res.redirect(`/show/${req.params.id}`))
            .catch((e)=>{res.render("err404", {pageTitle:"err in update", errMsg:e.message})})
            
        }) 
      

    }

}

module.exports = User
