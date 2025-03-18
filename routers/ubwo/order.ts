const express = require("express");
const { OrderAdd } = require("../../controllers/ubwo/order");

const router = express.Router();

router.post("/", OrderAdd);

module.exports = router;
