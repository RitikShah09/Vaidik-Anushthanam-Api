const express = require("express");
const router = express.Router();
const {
  currentAdmin,
  allUser,
  allPujari,
  deleteUser,
  deletePujari,
  allOrder,
} = require("../controllers/adminControllers");
const { isAdmin } = require("../middlewares/auth");

router.get("/", isAdmin, currentAdmin);

router.get("/all-user", isAdmin, allUser);
router.get("/all-pujari", isAdmin, allPujari);
router.get("/all-order", isAdmin, allOrder);


router.get("/delete-user/:id", isAdmin, deleteUser);
router.get("/delete-pujari/:id", isAdmin, deletePujari);

module.exports = router;
