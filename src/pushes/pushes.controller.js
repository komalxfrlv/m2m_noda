const { Expo } = require('expo-server-sdk')

async function Pushes(req, res, next) {
    try{
    console.log(req.body)


    const postData = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

  //make sure to serialize your JSON body
        body: JSON.stringify({
            push: req.body.push
        })
    }


    await fetch(`http://${process.env.PUSH_HOST}:${process.env.PUSH_PORT}/api/push`, postData)
    .then(async (res) => console.log(await res.json()))
    .catch(err => {throw new Error(err)})
    res.json("DONE")
}
catch(err){
    console.log(err)
    next(err)
}
}



module.exports = {
    Pushes
};