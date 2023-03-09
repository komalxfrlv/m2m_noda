const bcrypt = require('bcrypt');
const { db } = require('../../utils/db');
const UserRole = {
  administrator: 'administrator',
  developer: 'developer',
  manager: 'manager',
  support: 'support',
  user: 'user',
}

function findUserByEmail(email) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

function createUser(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  user.role = UserRole.user;
  return db.user.create({
    data: user,
  });
}

function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser
};