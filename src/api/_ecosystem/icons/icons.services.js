const { db } = require('../../../utils/db');

async function getAllUserIcons(userId){
    return await db.icon.findMany({
        where:{
            userId:userId
        }
    })
}

async function getIconById(id){
    return await db.icon.findUnique({
        where:{
            id:id
        }
    })
}

async function getStandartIcons(){
    return await db.icon.findMany({
        where:{
            userId: null
        }
    })
}


async function createNewIcon(data){
    return await db.icon.create({
        data:data
    })
}

async function updateIcon(data){
    return await db.icon.update({
        where:{
            id: data.id
        },
        data:data
    })
}

async function deleteIcon(icon){
    return await db.icon.delete({
        where:{
            id:icon
        }
    })
}

module.exports = {
    getAllUserIcons,
    createNewIcon,
    updateIcon,
    deleteIcon,
    getIconById,
    getStandartIcons,
}