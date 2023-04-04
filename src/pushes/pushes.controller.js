const { Expo } = require('expo-server-sdk')

async function testingPushes(req, res, next) {

    let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
    
    console.log('pushApi');
    res.json({message: "push"})
}

module.exports = {
    testingPushes
};