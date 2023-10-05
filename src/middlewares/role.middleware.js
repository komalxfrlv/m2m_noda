const jwt = require('jsonwebtoken');
const { db } = require('../utils/db');
const {findUserById} = require("../api/users/users.services")

async function checkRole(req, res, next, role) {
    try{
        const roles = ["bannedUser","user","support","manager","administrator","developer"]
        const userId = req.payload.userId
        let user = await findUserById(userId)
        if(roles.indexOf(user.role) < roles.indexOf(role)){
            console.log(user)
            console.log(`${user.role} must be ${role} or higher `)
            res.status(401);
            throw new Error(`${user.role} can't do this rout`);
        }
    }
    catch(err){
        res.status(401);

        console.log(err);

        next(err);
    }
    return next();
}

async function isAdmin(req, res, next){
    checkRole(req, res, next, "administrator")
}

async function isManager(req, res, next){
    checkRole(req, res, next, "manager")
}

async function isDeveloper(req, res, next){
    checkRole(req, res, next, "developer")
}

async function isSupport(req, res, next){
    checkRole(req, res, next, "support")
}

module.exports = {
    isAdmin,
    isManager,
    isDeveloper,
    isSupport
  }