const { postEmailReq } = require('../../utils/mailer');
const { findUserById,
        updateUserById } = require('./users.services');
const crypto = require('crypto')


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
        var code = Math.floor(Math.random()*8999)+1000
        console.log(code)
        await postEmailReq(user.email, code)
        const hash_rst = {"hash_rst":crypto.createHash('sha512').update(''+code).digest('hex')}
        await updateUserById(userId, hash_rst)
        res.json("code send on your email")
    } catch (err) {
        next(err);
    }
}
module.exports ={
    profile,
    sendRefreshCodeAtMail
}