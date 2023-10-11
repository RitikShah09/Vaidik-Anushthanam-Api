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
  createPuja,
  singlePuja,
} = require("../controllers/adminControllers");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.get("/", isAuthenticated, currentAdmin);
router.get("/all-user", isAuthenticated, allUser);
router.get("/all-pujari", isAuthenticated, allPujari);
router.get("/all-puja", isAuthenticated, allPuja);
router.post("/create-puja", isAuthenticated, createPuja);
router.post("/update-puja/:id", isAuthenticated, updatePuja);
router.get("/puja/:id", isAuthenticated, singlePuja);



router.get("/delete-user/:id", isAuthenticated, deleteUser);
router.get("/delete-pujari/:id", isAuthenticated, deletePujari);
router.get("/delete-puja/:id", isAuthenticated, deletePuja);

module.exports = router;
