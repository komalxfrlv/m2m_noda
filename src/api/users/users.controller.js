const { postEmailReq } = require('../../utils/mailer');
const { findUserById,
        updateUserById, 
        findUserByEmail} = require('./users.services');
const crypto = require('crypto')
const bcrypt = require('bcrypt');

async function profile(req, res, next) {
    try {
        console.log(req)
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
        //console.log(req)
        const { userId } = req.payload
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
        const { userId } = req.payload
        const user = await findUserById(userId)
        const code = req.body.code
        const code_hash = crypto.createHash('sha512').update(''+code).digest('hex')
        console.log(code)
        if (code_hash == user.hash_rst){
            user.password = bcrypt.hashSync(req.body.password, 12)
            user.hash_rst = null
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

async function resetForgotenPassword(req, res, next) {
    try {
        const user = await findUserByEmail(req.body.email)
        var newPass = ''
        for (let i = 0; i < 10; i++) {
            const randomChar = Math.floor(Math.random()*89)+33;
            newPass+=String.fromCharCode(randomChar)
        }
        await postEmailReq(user.email, `Ваш новый пароль - ${newPass}\nМы рекомендуем его сменить как можно раньше`)
        console.log(newPass)
        user.password = bcrypt.hashSync(newPass, 12)
        await updateUserById(user.id, user)
        res.json("done!")
    } catch (err) {
        next(err);
    }
}


module.exports ={
    profile,
    sendRefreshCodeAtMail,
    ChangePasswordByResetCode,
    resetForgotenPassword
}