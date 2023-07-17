async function getMainServerTime(){
    const currentDate = new Date()
    currentDate.setHours(currentDate.getHours()+5)
    return currentDate.toISOString()
}

module.exports = {
    getMainServerTime
}