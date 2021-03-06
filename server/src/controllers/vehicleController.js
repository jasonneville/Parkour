const userDAL = require("../databaseMethods/userDAL");

/**
 * Updates the specified vehicle.
 * @param {*} req - Request object containing information to update in the vehicle.
 * @param {*} res - Response object containing the vehicle in the data field or error message.
 */
module.exports.updateVehicle = async function (req, res) {
    try {
      if (!req.params.id) {
        res.status(400).json({
          message: "No vehicle id specified.",
        });
        return;
      }
      if (!("sessionid" in req.headers)) {
        res.status(400).json({
          message: "No sessionId sent in request headers",
        });
        return;
      }
      let user = await userDAL.getUserByUUID(req.headers.sessionid);
      if (!user) {
        res.status(400).json({
          message:
            "User cannot be found with sessionid: " + req.headers.sessionid,
        });
        return;
      }
      const data = req.body;
      const vehicleKeys = ["licensePlate", "make", "model", "year", "color"];
      const vehicleIndex = await findVehicle(user, req.params.id);
      console.log(vehicleIndex);
      if (vehicleIndex === -1) {
        res.status(400).json({
          message: "Could not find vehicle with id: " + req.params.id,
        });
        return;
      }
      for (const [key, value] of Object.entries(data)) {
        if (vehicleKeys.includes(key)) {
          user.vehicles[vehicleIndex][key] = value;
        }
      }
  
      const savedUser = await userDAL.updateUser(user);
  
      res.status(200).json({
        message: "Vehicle information updated successfully.",
        data: savedUser,
      });
      return;
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  };
  
 /**
 * Removes a vehicle from the current user.
 * @param {*} req - Request object
 * @param {*} res - Response object containing the updated user in the data field or error message.
 */
  module.exports.removeVehicle = async function (req, res) {
    try {
      if (!req.params.id) {
        res.status(400).json({
          message: "No vehicle id specified.",
        });
        return;
      }
      if (!("sessionid" in req.headers)) {
        res.status(400).json({
          message: "No sessionId sent in request headers",
        });
        return;
      }
      let user = await userDAL.getUserByUUID(req.headers.sessionid);
      if (!user) {
        res.status(400).json({
          message:
            "User cannot be found with sessionid: " + req.headers.sessionid,
        });
        return;
      }
      const vehicleId = req.params.id;
      for (let i = 0; i < user.vehicles.length; i++) {
        const id = user.vehicles[i]._id;
        if (id.equals(vehicleId)) {
          user.vehicles.splice(i, 1);
          const savedUser = await userDAL.updateUser(user);
  
          res.status(200).json({
            message: "Vehicle deleted successfully",
            data: savedUser,
          });
          return;
        }
      }
      res.status(400).json({
        message: "Could not find vehicle with id: " + vehicleId,
      });
      return;
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  };
  
/**
 * Adds a vehicle to the current user.
 * @param {*} req - Request object with information of the vehicle to create.
 * @param {*} res - Response object containing the updated user in the data field or error message.
 */
  module.exports.addVehicle = async function (req, res) {
    try {
      vehicleKeys = ["licensePlate", "make", "model", "year", "color"];
      if (!vehicleKeys.every((item) => req.body.hasOwnProperty(item))) {
        res.status(400).json({
          message:
            "Not all keys supplied in request body. Must contain licensePlate, make, model, year, and color",
        });
        return;
      }
      if (!("sessionid" in req.headers)) {
        res.status(400).json({
          message: "No sessionId sent in request headers",
        });
        return;
      }
  
      let user = await userDAL.getUserByUUID(req.headers.sessionid);
      if (!user) {
        res.status(400).json({
          message:
            "User cannot be found with sessionid: " + req.headers.sessionid,
        });
        return;
      }
      user.vehicles.push(req.body);
  
      const savedUser = await userDAL.updateUser(user);
      if (savedUser) {
        res.status(200).json({
          message: "Vehicle registered successfully",
          data: savedUser,
        });
        return;
      } else {
        res.status(400).json({
          message: "Could not register vehicle",
        });
        return;
      }
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  };
  
  /**
   * 
   * @param {*} user - User object to search through.
   * @param {*} vehicleId - Id of the vehicle to find.
   * @returns {int} Index of the found vehicle, otherwise returns -1.
   */
  const findVehicle = async function (user, vehicleId) {
    for (let i = 0; i < user.vehicles.length; i++) {
      const id = user.vehicles[i]._id;
      if (id.equals(vehicleId)) {
        return i;
      }
    }
    return -1;
  };