const jwt = require('jsonwebtoken');
const { db } = require('../utils/db');

async function isAdmin(req, res, next) {
    try{
        const userId = req.payload.userId
        let user = await db.user.findFirst({
            where: { 
                id: userId,
            }
        });
        if(user.role != "administrator"){
            console.log(user)
            res.status(401);
            throw new Error("This user can't add versions");
        }
    }
    catch(err){
        res.status(401);

        console.log(err);

        next(err);
    }
    return next();
}


module.exports = {
    isAdmin
  }