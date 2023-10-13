const { findLatestVersionId } = require('../versions/versions.services');
const iconServices= require('./icons.services')

async function getIncons(req, res, next){
    try{
        res.json(await iconServices.getAllUserIcons(req.payload.userId))
    }
    catch(err){
        next(err)
    }
}

async function getStandartIcons(req, res, next){
    try{
        res.json(await iconServices.getStandartIcons())
    }
    catch(err){
        next(err)
    }
}

async function postNewIcon(req, res, next){
    try{
        let {icon} = req.body
        icon.userId = req.payload.userId
        res.json(await iconServices.createNewIcon(req.body.icon))
    }
    catch(err){
        next(err)
    }
}

async function postNewStandartIcon(req, res, next){
    try{
        res.json(await iconServices.createNewIcon(req.body.icon))
    }
    catch(err){
        next(err)
    }
}

async function updateUserIcon(req, res, next){
    try{
        const {icon} = req.body
        const updatedIcon = await iconServices.getIconById(icon.id)
        if(req.payload.userId != updatedIcon.userId) throw new Error('not your icon')
        res.json(await iconServices.updateIcon(icon))
    }
    catch(err){
        next(err)
    }
}

async function updateStandartIcon(req, res, next){
    try{
        const {icon} = req.body
        const updatedIcon = await iconServices.getIconById(icon.id)
        if(!updatedIcon.userId) throw new Error('its someone icon')
        res.json(await iconServices.updateIcon(icon))
    }
    catch(err){
        next(err)
    }
}


async function deleteIcon(req, res, next){
    try{
        const {icon} = req.body
        const updatedIcon = await iconServices.getIconById(icon.id)
        if(req.payload.userId != updatedIcon.userId) throw new Error('not your icon')
        res.json(await iconServices.deleteIcon(icon))
    }
    catch(err){
        next(err)
    }
}

async function deleteStandartIcon(req, res, next){
    try{
        const {icon} = req.body
        const updatedIcon = await iconServices.getIconById(icon.id)
        if(!updatedIcon.userId) throw new Error('its someone icon')
        res.json(await iconServices.deleteIcon(icon))
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    getIncons,
    postNewIcon,
    postNewStandartIcon,
    getStandartIcons,
    updateUserIcon,
    updateStandartIcon,
    deleteIcon,
    deleteStandartIcon
}