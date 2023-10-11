const express = require("express");
const {
  currentAdmin,
  allUser,
  allPujari,
  allPuja,
  deleteUser,
  deletePujari,
  deletePuja,
  updatePuja,
} = require("../controllers/adminControllers");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/", isAuthenticated, currentAdmin);
router.post("/all-user", isAuthenticated, allUser);
router.post("/all-pujari", isAuthenticated, allPujari);
router.post("/all-puja", isAuthenticated, allPuja);
router.post("/update-puja/:id", isAuthenticated, updatePuja);

router.get("delete-user/:id", isAuthenticated, deleteUser);
router.get("delete-pujari/:id", isAuthenticated, deletePujari);
router.get("delete-puja/:id", isAuthenticated, deletePuja);

module.exports = router;
