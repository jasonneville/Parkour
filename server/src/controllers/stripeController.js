const userDAL = require("../databaseMethods/userDAL");
const authUtils = require("../util/authUtils");
const stripeUtils = require("../util/stripeUtils");
/**
 * Retrieves the stripe id of the current user.
 * @param {*} req - Request object
 * @param {*} res - Response object containing the user's stripe id in the data field or error message.
 */
module.exports.getStripeBySess = async function (req, res) {
  try {
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
    } else {
      res.status(200).json({
        message: "User stripeId found",
        stripeId: user.stripeId,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

/**
 * Adds a stripe id to the current user.
 * @param {*} req - Request object
 * @param {*} res - Response object containing the user's id in the data field or error message.
 */
module.exports.addStripeId = async function (req, res) {
  try {
    if (!req.body.hasOwnProperty("stripeId")) {
      res.status(400).json({
        message: "You must supply a stripeId to append to the user",
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
    user.stripeId = req.body.stripeId;

    const savedUser = await userDAL.updateUser(user);
    if (savedUser) {
      res.status(200).json({
        message: "Stripe Id registered to user",
        user: { id: savedUser._id },
      });
      return;
    } else {
      res.status(400).json({
        message: "Could not register stripe id",
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
 * Updates the current user's stripe id.
 * @param {*} req - Request object
 * @param {*} res - Response object containing the user's id and stripe id in the data field or error message.
 */
module.exports.updateStripeId = async function (req, res) {
  try {
    if (!req.body.stripeId) {
      res.status(400).json({
        message: "No id sent to update",
      });
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
    const id = req.body.stripeId;
    user.stripeId = id;

    const savedUser = await userDAL.updateUser(user);

    res.status(200).json({
      message: "Stripe Id updated successfully!",
      user: { id: savedUser._id, stripeId: savedUser.stripeId },
    });
    return;
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

/**
 * Removes the stripe id from the current user.
 * @param {*} req - Request object
 * @param {*} res - Response object containing containing success or error message.
 */
module.exports.removeStripeId = async (req, res) => {
  try {
    if (!("sessionid" in req.headers)) {
      res.status(400).json({
        message: "No sessionId sent in request headers",
      });
    } else {
      let user = await userDAL.getUserByUUID(req.headers.sessionid);
      if (!user) {
        res.status(400).json({
          message:
            "User cannot be found with sessionid: " + req.headers.sessionid,
        });
      } else {
        user.stripeId = null;
        await userDAL.updateUser(user);
        res.status(200).json({ message: "Users stripId has been removed" });
      }
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

/**
 * Adds a stripe card to the current user.
 * @param {*} req - Request object with card information.
 * @param {*} res - Response object containing card information in the data field or error message.
 */
module.exports.addStripeCard = async (req, res) => {
  try{

		if (!authUtils.checkSessionId(req)) {
			res.status(400).json({
				message: "No sessionId sent in request headers",
			});
			return;
		}
		let user = await userDAL.getUserByUUID(req.headers.sessionid)
		if (!user) {
			res.status(400).json({
			  message: "No user matching supplied sessionId",
			});
			return;
    }
    const card = await stripeUtils.createCard(user.stripeId, req.body.source);

    res.status(200).json({
      message: "Card added successfully",
      data: card
    });
    return;
  }
  catch(e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

/**
 * Creates a stripe customer for the current user.
 * @param {*} req - Request object
 * @param {*} res - Response object containing created stripe customer information in the data field or error message.
 */
module.exports.addCustomer = async (req, res) => {
  try{
    if (!authUtils.checkSessionId(req)) {
			res.status(400).json({
				message: "No sessionId sent in request headers",
			});
			return;
		}
		let user = await userDAL.getUserByUUID(req.headers.sessionid)
		if (!user) {
			res.status(400).json({
			  message: "No user matching supplied sessionId",
			});
			return;
    }
    
    const customer = await stripeUtils.createCustomer();

    res.status(200).json({
      message: "Customer added successfully",
      data: customer
    });
    return;

  }
  catch(e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

/**
 * Updates the default card for the current user.
 * @param {*} req - Request object with the specified card id. 
 * @param {*} res - Response object containing success or error message.
 */
module.exports.updateDefaultCard = async (req, res) => {
  try{
    if (!authUtils.checkSessionId(req)) {
			res.status(400).json({
				message: "No sessionId sent in request headers",
			});
			return;
		}
		let user = await userDAL.getUserByUUID(req.headers.sessionid)
		if (!user) {
			res.status(400).json({
			  message: "No user matching supplied sessionId",
			});
			return;
    }
    
    await stripeUtils.updateDefaultCard(user.stripeId, req.body.cardId);

    res.status(200).json({
      message: "Card updated successfully"
    });
    return;
  }
  catch(e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

/**
 * Removes the specified card from the current user.
 * @param {*} req - Request object with the card id to remove.
 * @param {*} res - Response object containing the deleted card in the data field or error message.
 */
module.exports.removeCard = async (req, res) => {
  try{
    if (!authUtils.checkSessionId(req)) {
			res.status(400).json({
				message: "No sessionId sent in request headers",
			});
			return;
		}
		let user = await userDAL.getUserByUUID(req.headers.sessionid)
		if (!user) {
			res.status(400).json({
			  message: "No user matching supplied sessionId",
			});
			return;
    }
    
    const deletedCard = await stripeUtils.deleteCard(user.stripeId, req.body.cardId);

    res.status(200).json({
      message: "Card deleted successfully",
      data: deletedCard
    });
    return;
  }
  catch(e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

/**
 * Gets the stripe customer information for the current user.
 * @param {*} req - Request object
 * @param {*} res - Response object containing the user's customer information in the data field or error message.
 */
module.exports.getCustomer = async (req, res) => {
  try{
    if (!authUtils.checkSessionId(req)) {
			res.status(400).json({
				message: "No sessionId sent in request headers",
			});
			return;
		}
		let user = await userDAL.getUserByUUID(req.headers.sessionid)
		if (!user) {
			res.status(400).json({
			  message: "No user matching supplied sessionId",
			});
			return;
    }
    const customer = await stripeUtils.getCustomer(user.stripeId);

    res.status(200).json({
      message: "Customer received successfully",
      data: customer
    });
    return;
  }
  catch(e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

/**
 * Retrieves all cards for the current user.
 * @param {*} req - Request object
 * @param {*} res - Response object containing all cards for the user in the data field or error message.
 */
module.exports.getCards = async (req, res) => {
  try{
    if (!authUtils.checkSessionId(req)) {
			res.status(400).json({
				message: "No sessionId sent in request headers",
			});
			return;
    }
    
		let user = await userDAL.getUserByUUID(req.headers.sessionid)
		if (!user) {
			res.status(400).json({
			  message: "No user matching supplied sessionId",
			});
			return;
    }
    console.log(user.stripeId)
    const cards = await stripeUtils.getCards(user.stripeId);

    res.status(200).json({
      message: "Cards gotten successfully",
      data: cards
    });
    return;
  }
  catch(e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

