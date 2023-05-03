const { postEmailReq } = require('../../utils/mailer');
const { findUserById,
        updateUserById } = require('./users.services');
const crypto = require('crypto')
const bcrypt = require('bcrypt');

async function profile(req, res, next) {
    try {
        const { userId } = req.payload;
        
        const user = await findUserById(userId);
        delete user.password;

        res.json(user);
    } catch (err) {
        next(err);
    }
}

async function sendRefreshCodeAtMail(req, res, next) {
    try {
        const { userId } = req.body
        const user = await findUserById(userId)
        const code = Math.floor(Math.random()*8999)+1000
        console.log(code)
        await postEmailReq(user.email, code)
        const hash_rst = {"hash_rst":crypto.createHash('sha512').update(''+code).digest('hex')}
        await updateUserById(userId, hash_rst)
        res.json("code send on your email")
    } catch (err) {
        next(err);
    }
}

async function ChangePasswordByResetCode(req, res, next) {
    try {
        const { userId } = req.body
        const user = await findUserById(userId)
        const code = req.body.code
        const code_hash = crypto.createHash('sha512').update(''+code).digest('hex')
        console.log(code)
        if (code_hash == user.hash_rst){
            user.password = bcrypt.hashSync(req.body.password, 12)
            user.hash_rst = ""
            await updateUserById(userId, user)
        }
        else{
            throw new Error('Wrong code');
        }
        res.json("done!")
    } catch (err) {
        next(err);
    }
}

module.exports ={
    profile,
    sendRefreshCodeAtMail,
    ChangePasswordByResetCode
}