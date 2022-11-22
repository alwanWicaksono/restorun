const express = require('express');
const router = express.Router();

const admin = require('./admin');
const user = require('./user');

router.use('/users', user)
router.use('/admin', admin)

module.exports = router