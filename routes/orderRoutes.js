const express = require("express");
const router = express.Router();
const { createOrder, updateOrder } = require("../controllers/orderControllers");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/create", isAuthenticated, createOrder);
router.post("/update/:id", isAuthenticated, updateOrder);

module.exports = router;
