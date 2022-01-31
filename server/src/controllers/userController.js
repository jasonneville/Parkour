const userDAL = require("../databaseMethods/userDAL");
const UtilMethods = require("../util/UtilMethods");

/**
 * Returns all users.
 * @param {*} req - Request object
 * @param {*} res - Response object containing all users in the data field or error message.
 */
module.exports.getAllUsers = async function (req, res) {
  try {
    const allUsers = await userDAL.getAllUsers();
    res.status(200).json({
      message: "Users retrieved successfully",
      data: allUsers,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error retrieving all users",
    });
  }
};

/**
 * Retrieves the specified user.
 * @param {*} req - Request object with the specified user.
 * @param {*} res - Response object containing the specified user in the data field or error message.
 */
module.exports.getUser = async function (req, res) {
  try {
    const email = req.params.email;
    const user = await userDAL.getUserByEmail(email);
    if (!user) {
      res.status(400).json({
        message: "Could not find user with email: " + email,
      });
    } else {

      const returnObj = await UtilMethods.createUserReturnObj(user)
      res.status(200).json({
        message: "User retrieved successfully",
        data: returnObj,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

/**
 * Retrieves the current user.
 * @param {*} req - Request object
 * @param {*} res - Response object containing the current user in the data field or error message.
 */
module.exports.getMe = async function (req, res) {
  try {
    const headers = req.headers;
    if (!("sessionid" in headers)) {
      res.status(400).json({
        message: "No sessionId sent in request headers",
      });
    } else {
      let user = await userDAL.getUserByUUID(headers.sessionid);

      if (!user) {
        res.status(400).json({
          message: "No user matching supplied sessionId",
        });
      }

      let userObj = user.toObject();
      
      const returnObj = await UtilMethods.createUserReturnObj(userObj);

      res.status(200).json({
        message: "User retrieved successfully",
        data: returnObj,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

/**
 * Updates the specified user.
 * @param {*} req - Request object containing the information about the user.
 * @param {*} res - Response object containing the updated user in the data field or error message.
 */
module.exports.updateUser = async function(req, res) {
	try {
		const headers = req.headers;
		if (!("sessionid") in headers) {
			res.status(400).json({
				message: "No sessionId sent in request headers",
			});
			return;
		}
		let user = await userDAL.getUserByUUID(headers.sessionid)
		if (!user) {
			res.status(400).json({
			  message: "No user matching supplied sessionId",
			});
			return;
		}
		
		const data = req.body;

		for (const [key, value] of Object.entries(data)) {
			if (key in user) {
				user[key] = value;
			}
		}
		
		const updatedUser = await UtilMethods.createUserReturnObj(await userDAL.updateUser(user));

		if (updatedUser) {
			res.status(200).json({
				message: "User updated successfully",
				data: updatedUser
			})
			return;
		}
		else {
			res.status(500).json({
				message: "Error saving new user data"
			})
		}
		
	}
	catch(e) {
	res.status(500).json({
		message: e.message
	})
	}
}
