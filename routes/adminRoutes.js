const express = require("express");
const router = express.Router();
const {
  currentAdmin,
  allUser,
  allPujari,
  deleteUser,
  deletePujari,
  allOrder,
  offerPuja,
} = require("../controllers/adminControllers");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/", isAuthenticated, currentAdmin);

router.get("/all-user", isAuthenticated, allUser);
router.get("/all-pujari", isAuthenticated, allPujari);
router.get("/all-order", isAuthenticated, allOrder);


router.get("/delete-user/:id", isAuthenticated, deleteUser);
router.get("/delete-pujari/:id", isAuthenticated, deletePujari);

module.exports = router;
