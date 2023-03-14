const bcrypt = require('bcrypt');
const { db } = require('../../utils/db');

const UserRole = {
  administrator: 'administrator',
  developer: 'developer',
  manager: 'manager',
  support: 'support',
  user: 'user',
}
const UserStatus = {
  active: "active",
  inactive: "inactive"
}

function findUserByEmail(email) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

async function createUser(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  user.role = UserRole.user;
  user.status = UserStatus.active;

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