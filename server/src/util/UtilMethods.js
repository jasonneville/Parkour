const { v4: uuidv4 } = require("uuid");

/**
 * 
 * @returns {String} - UUID string 
 */
module.exports.createUUID = async () => {
  let uuid = await uuidv4();
  return uuid;
}

/**
 * 
 * @param {*} user - User object 
 * @returns {*} - User object with sensitive fields omitted. 
 */
module.exports.createUserReturnObj = async (user) => {
    let returnObj = new Object();
    returnObj.id = user._id;
    returnObj.nickname = user.nickname;
    returnObj.sessionId = user.sessionId;
    returnObj.firstName = user.firstName;
    returnObj.lastName = user.lastName;
    returnObj.phoneNumber = user.phoneNumber;
    returnObj.vehicles = user.vehicles;
    returnObj.email = user.email;
    returnObj.host = user.host;
    return returnObj;
}

