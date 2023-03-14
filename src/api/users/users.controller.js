const { findUserById } = require('./users.services');

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
exports.profile = profile;