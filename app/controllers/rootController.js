const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authMiddleware');


router.use(authenticateUser);

module.exports = router;
