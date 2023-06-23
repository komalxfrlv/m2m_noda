const { postEmailReq } = require('../../utils/mailer');
const { findUserById,
        updateUserById, 
        findUserByEmail} = require('./users.services');
const {validateUserSettingsChanging} = require('./users.validators')
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

async function sendRefreshCodeAtMail(req, res, next) {                  //Тут генерируется код для замены пароля и отправляется по почте
    try {
        //console.log(req)
        const { userId } = req.payload
        const user = await findUserById(userId) // ищем юзера по токену

        const code = Math.floor(Math.random()*8999)+1000 //случайное число от 1000 до 9999

        console.log(code) //логируем в консоль
        await postEmailReq(user.email, code)    //Отправка на почтовый сервер
        const hash_rst = crypto.createHash('sha512').update(''+code).digest('hex')
        user.hash_rst = hash_rst
        await updateUserById(user)  //код преобразуем в хэш, после записываем специальное поле юзера
        res.json("code send on your email")
    } catch (err) {
        next(err);
    }
}

async function ChangePasswordByResetCode(req, res, next) {
    try {
        const { userId } = req.payload
        const user = await findUserById(userId)         //Ищем юзера по токену
        const code = req.body.code
        const password = req.body.password
        if (!password || !code) {
            throw new Error('You must provide an code and a password');
        }
        const code_hash = crypto.createHash('sha512').update(''+code).digest('hex') // Присланный код преобразуем в хэш
        console.log(code)
        if (code_hash == user.hash_rst){        //Если совпадает, то
            user.password = bcrypt.hashSync(password, 12)  //меняем пароль на присланный
            user.hash_rst = null        //Обнуляем ресет код
            await updateUserById(user) 
        }
        else{
            throw new Error('Wrong code');
        }
        res.json("DONE!")
    } catch (err) {
        next(err);
    }
}

async function resetForgotenPassword(req, res, next) {
    try {
        //ищем юзера по почте
        const email = req.body.email
        if(!email){
            throw new Error("You must provide all field");
        }
        const user = await findUserByEmail(email)
        if(!user){
            throw new Error("Can't find user");
        } 
        // генерируем пароль из 10 ascii символов
        var newPass = ''
        for (let i = 0; i < 10; i++) {
            const randomChar = Math.floor(Math.random()*89)+33;
            newPass+=String.fromCharCode(randomChar)
        }
        // отправляем на почту пароль
        const message = `Ваш новый пароль - <br><br>${newPass}
        <br>>Мы рекомендуем его сменить как можно раньше`
        await postEmailReq(user.email, message)
        console.log(newPass)
        //меняем пароль на сгенерированный
        user.password = bcrypt.hashSync(newPass, 12)
        await updateUserById(user)
        res.json("DONE!")
    } catch (err) {
        next(err);
    }
}

async function changeUserSettings(req, res, next) {
    try {
        const { userId } = req.payload
        const user = await findUserById(userId)

        //Чекаем все. Если не нул, меняем на пришедшее в запросе
        if(req.body.name) user.name = req.body.name
        if(req.body.surname) user.surname = req.body.surname
        if(req.body.patronymic) user.patronymic = req.body.patronymic
        if(req.body.email) {
            if(!findUserByEmail(req.body.email)){
                user.email = req.body.email}
            else{
                throw new Error("User with this email already exist")
            }
        if(req.body.auto_updating) user.auto_updating = req.body.auto_updating
        if(req.body.auto_paying) user.auto_paying = req.body.auto_paying
        if(req.body.phone) user.phone = req.body.phone
        if(req.body.cityId) user.cityId = req.body.cityId

        await validateUserSettingsChanging(user)
        await updateUserById(user)
        
        console.log(user)
        console.log()

        delete user.password;
        res.json(user);
        }
    } catch (err) {
        next(err);
    }
}

async function setPushToken(req, res, next){
    try{
        const token = req.body.token
        if(!token) throw new Error("Can't find token")
        let user = await findUserById(req.payload.userId)
        user.token = token
        await updateUserById(user)
        res.json("DONE!")
    }
    catch(err){
        next(err)
    }
}

module.exports ={
    profile,
    sendRefreshCodeAtMail,
    ChangePasswordByResetCode,
    resetForgotenPassword,
    changeUserSettings,
    setPushToken
}