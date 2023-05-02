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

async function findUserByEmail(email) {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
}

async function createUser(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  user.role = UserRole.user;
  user.status = UserStatus.active;

  return await db.user.create({
    data: user,
  });
}

async function findUserById(id) {
  console.log(id)
  return await db.user.findUnique({
    where: {
      id:id,
    },
  });
}

async function updateUserById(id, data) {
  return await db.user.update({
      where: {
          id,
      },
      data: data,
  });
}


module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUserById
};