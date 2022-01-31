const User = require('../models/userModel');

/**
 * 
 * @param {*} uuid 
 * @returns 
 */
const getUserByUUID = async function (uuid) {
  const user = await User.findOne({ sessionId: uuid });
  return user;
};

/**
 * 
 * @param {*} data 
 * @returns 
 */
const createUser = async function (data) {
  user = new User(data);
  await user.save();
  return user;
};

/**
 * 
 * @param {*} data 
 * @returns 
 */
const getUserById = async function (data) {
  const resp = await User.findOne({ _id: data });
  return resp;
};

/**
 * 
 * @param {*} emailAddress 
 * @returns 
 */
const getUserByEmail = async function (emailAddress) {
  const resp = await User.findOne({ email: emailAddress });
  return resp;
};

/**
 * 
 * @param {*} user 
 * @returns 
 */
const updateUser = async function (user) {
  await user.save();
  return user;
};

/**
 * 
 * @returns 
 */
const getAllUsers = async function () {
  const allUsers = await User.find({});
  return allUsers;
};

module.exports = {
  getUserByUUID,
  getUserByEmail,
  getAllUsers,
  createUser,
  updateUser,
  getUserById
};
