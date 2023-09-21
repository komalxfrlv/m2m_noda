/*
TODO
Добавить лимит неправильно введенного пароля, кода восстановления
*/
const { postEmailReq } = require('../../utils/mailer');
const { findUserById,
        updateUserById, 
        findUserByEmail,
        findUserWithStationsByEmail} = require('./users.services');
const {validateUserSettingsChanging} = require('./users.validators')
const crypto = require('crypto')
const bcrypt = require('bcrypt');

async function profile(req, res, next) {
    try {
        //console.log(req)
        const { userId } = req.payload;
        
        const user = await findUserById(userId);
        delete user.password;

        res.json(user);
    } catch (err) {
        next(err);
    }
}

async function profileById(req, res, next){
    try{
        res.json( await findUserWithStationsByEmail(req.params.email))
    }
    catch(err){
        next(err)
    }
}

async function sendRefreshCodeAtMail(req, res, next) {                  //Тут генерируется код для замены пароля и отправляется по почте
    try {
        //console.log(req)
        const { userId } = req.payload
        const user = await findUserById(userId) // ищем юзера по токену

        const code = Math.floor(Math.random()*899999)+100000 //случайное число от 100000 до 999999

        console.log(code) //логируем в консоль
        postEmailReq(user, code)    //Отправка на почтовый сервер
        const hash_rst = crypto.createHash('sha512').update(''+code).digest('hex')
        user.hash_rst = hash_rst
        user.remainingTries = 10
        await updateUserById(user)  //код преобразуем в хэш, после записываем специальное поле юзера
        res.json("code send on your email")
    } catch (err) {
        next(err);
    }
}

async function ChangePasswordByResetCode(req, res, next) {
    try {
        const user = await findUserByEmail(req.body.email)
        const code = req.body.code
        const password = req.body.password
        
        if(user.remainingTries == 0){
            throw new Error('Too much tries')
        }

        if (!password || !code) {
            throw new Error('You must provide an code and a password');
        }
        
        const code_hash = crypto.createHash('sha512').update(''+code).digest('hex') // Присланный код преобразуем в хэш
        console.log(code)
        
        if (code_hash == user.hash_rst){        //Если совпадает, то
            user.password = bcrypt.hashSync(password, 12)  //меняем пароль на присланный 
            user.hash_rst = null        //Обнуляем ресет код
            user.remainingTries = 0
            await updateUserById(user) 
        }
        else{
            user.remainingTries -= 1 //иначе у пользователя на 1 попытку меньше
            console.log('Code hash:' + code_hash);
            console.log('User hash:' + user.hash_rst);
            await updateUserById(user)
            throw new Error('Wrong code');
        }

        res.json("DONE!")
    } catch (err) {
        next(err);
    }
}

async function checkCodeBeforeChangePwd(req, res, next) {
    try {
        const user = await findUserByEmail(req.body.email)
        const code = req.body.code
        
        if(user.remainingTries == 0){
            throw new Error('Too much tries')
        }
        
        const code_hash = crypto.createHash('sha512').update(''+code).digest('hex') // Присланный код преобразуем в хэш
        
        if (code_hash != user.hash_rst){
            throw new Error('Wrong code');
        }

        res.json("fine");
    } catch (err) {
        next(err);
    }
}

async function resetForgotenPassword(req, res, next) {
    try {
        //ищем юзера по почте
        if(!req.body.email){
            throw new Error("You must provide all field");
        }
        const user = await findUserByEmail(req.body.email)
        if(!user){
            throw new Error("Can't find user");
        } 
        // генерируем код из 5 цифр
        var code = '' + (Math.floor(Math.random() * 90000) + 10000) + '';
        // отправляем на почту код
        const message = `Ваш код - ${code}`
        postEmailReq(user, message)
        user.remainingTries = 10
        console.log(code)
        //меняем code на сгенерированный
        user.hash_rst = crypto.createHash('sha512').update(''+code).digest('hex')
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
        console.log(req.body)
        //Чекаем все. Если не нул, меняем на пришедшее в запросе
        if(req.body.name) user.name = req.body.name
        if(req.body.surname) user.surname = req.body.surname
        if(req.body.patronymic) user.patronymic = req.body.patronymic
        if(req.body.auto_updating) user.auto_updating = req.body.auto_updating
        if(req.body.auto_paying) user.auto_paying = req.body.auto_paying
        if(req.body.phone) user.phone = req.body.phone
        if(req.body.cityId) user.cityId = req.body.cityId
        await validateUserSettingsChanging(user)
        await updateUserById(user)
        
        delete user.password;
        res.json(user);
    }
    catch (err) {
        next(err);
    }
}

async function setPushToken(req, res, next){
    try{
        const token = req.body.token
        if(!token) throw new Error("Can't find token")
        let user = await findUserById(req.payload.userId)
        if(!user.token.find(exToken => exToken == token)){
            user.token.push(token)
        }
        else{
            throw new Error('token already seted')
        }
        await updateUserById(user)
        res.json("DONE!")
    }
    catch(err){
        next(err)
    }
}

async function confirmUserEmail(req, res, next){
    try{
        const {userEmail} = req.params
        const user = await findUserByEmail(userEmail)
        user.verified = true
        await updateUserById(user)
        const html = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <title>Registarion Success</title>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
              href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
              rel="stylesheet"
            />
            <style>
              .header {
                padding: 16px;
                background-color: #9830fa;
                color: white;
              }
              .block_head {
                color: #000000;
                margin: 40px 0px 20px 0px;
                text-align: center;
                font-family: Open Sans;
                /* font-weight: bold; */
                font-size: 36px;
              }
              .hr {
                width: 150px;
              }
              .block_body {
                color: #000000;
                margin: 20px 0px 20px 0px;
                text-align: center;
                font-family: Open Sans;
                font-size: 15px;
                font-weight: 400px;
              }
              .button_block {
                margin: 30px 0px 20px 0px;
                display: flex;
                justify-content: center;
              }
              .button {
                flex: 1;
                max-width: 300px;
                border-radius: 50px;
                background-color: #9830fa;
                font-family: Open Sans;
                font-size: 15px;
                color: white;
                text-align: center;
                border-width: 0;
                padding-top: 14px;
                padding-bottom: 14px;
                cursor: pointer;
                text-transform: uppercase;
              }
              .button:hover {
                background-color: #7806e3;
              }
              .button:active {
                  background-color: #5704A5;
              }
        
              body {
                margin: 0;
                background: white;
              }
            </style>
          </head>
        
          <body>
            <div class="header"></div>
        
            <div class="block_head">
              <span>Регистрация прошла успешно</span>
            </div>
            <hr class="hr">
        
            <div class="block_body">
                <span>
                Поздравляем, вы успешно подтвердили ваш аккаунт в приложении M2M&nbspТелеком
                </span>
            </div>
          </body>
        </html>
        ` 
        res.send(html)
    }
    catch(err){
        next(err)
    }
}

async function changeNotificationSettings(req, res, next){
    try{
        const user = await findUserById(req.payload.userId)
        if(typeof req.body.get_push == "boolean"){
            user.get_push = req.body.get_push
        }
        if(typeof req.body.get_email == "boolean") {

            user.get_email = req.body.get_email
        }
        await updateUserById(user)
        console.log(user)
        res.json("DONE!")
    }
    catch(err){
        next(err)
    }
}

async function verifyCode(req, res, next) {
    try {
        const {code, email} = req.body// сверяем присланный емэйл и код
        const user = await findUserByEmail(email)
        if(! user){
            throw new Error("Can't find user")
        }
        if(user.remainingTries == 0){
            throw new Error("too much tries")
        }
        const codeHash = bcrypt.hashSync(code, 12)
        if(codeHash == user.hash_rst){
            // если все ок то генерим новое 6ти значное число
            // хэшируем его и записываем в хэш
            // отправляем незахэшенное число в ответе
            let newCode = ""
            for (let i = 0; i < 10; i++) {
                const randomChar = Math.floor(Math.random()*89)+33;
                newCode+=String.fromCharCode(randomChar)
            }
            user.hash_rst = bcrypt.hashSync(newCode, 12)
            res.json({
                "email":email,
                "code": newCode
                })
        }
        else{
            user.remainingTries -= 1
            throw new Error("Wrong code")
        }
        // иначе кидаем ошибку
    } catch(err) {
        next(err)
    }
}

async function changePasswordByCode(req, res, next) {
    try {
        const{email, code, password} = req.body
        // сверяем присланный емэйл и код
        const user = await findUserByEmail(email)
        if(! user){
            throw new Error("Can't find user")
        }
        if(user.remainingTries == 0){
            throw new Error("too much tries")
        }
        const codeHash = bcrypt.hashSync(code, 12)
        if(codeHash == user.hash_rst){
        // если все ок то
        // меняем пароль
        user.password = bcrypt.hashSync(password, 12)
        user.hash_rst = ""
        user.remainingTries = 0
        // чистим 
        // отправляем в ответе что все ок
        }
        // иначе кидаем ошибку
        else{
            user.remainingTries = 0
            throw new Error("Ты, залупа ебаная, не пытайся хакнуть наш бэк, иначе я мать твою выебу, сука!")
        }
    } catch(err) {
        next(err)
    }
}

module.exports ={
    profile,
    sendRefreshCodeAtMail,
    ChangePasswordByResetCode,
    resetForgotenPassword,
    changeUserSettings,
    setPushToken,
    confirmUserEmail,
    changeNotificationSettings,
    profileById,
    verifyCode,
    changePasswordByCode,
    checkCodeBeforeChangePwd
}