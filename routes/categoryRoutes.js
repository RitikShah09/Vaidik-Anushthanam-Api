const express = require('express');

const { isAdmin} = require("../middlewares/auth");
const router = express.Router();

const {
    createCategory,
    allCategories
} = require("../controllers/categoryControllers");

router.get("/",isAdmin, allCategories);

router.post('/create', isAdmin, createCategory);

module.exports = router;
