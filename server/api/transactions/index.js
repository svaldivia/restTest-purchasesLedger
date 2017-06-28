'use strict';

const express = require('express');
const controller = require('./transactions.controller');

const router = express.Router();

router.get('/:page', controller.getTransactions);

module.exports = router;
