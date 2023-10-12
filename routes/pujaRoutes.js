const express = require("express");
const router = express.Router();
const {
  allPuja,
  deletePuja,
  updatePuja,
  createPuja,
  offerPuja,
  singlePuja,
  createOffer,
  deleteOffer,
} = require("../controllers/pujaControllers");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/", isAuthenticated, allPuja);
router.get("/offer", isAuthenticated, offerPuja);
router.post("/create", isAuthenticated, createPuja);
router.post("/update/:id", isAuthenticated, updatePuja);
router.get("/:id", isAuthenticated, singlePuja);

router.post("/create-offer/:id",isAuthenticated, createOffer);
router.get("/delete-offer/:id",isAuthenticated, deleteOffer);
router.get("/delete/:id", isAuthenticated, deletePuja);

module.exports = router;
