const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.get('/me', async (req, res) => {
  await userController.getMe(req, res);
});

router.get('/', async (req, res) => {
  await userController.getAllUsers(req, res);
});

router.get('/:email', async (req, res) => {
  await userController.getUser(req, res);
});


router.put('/updateUser', async (req, res) => {
  await userController.updateUser(req, res);
})


module.exports = router;
