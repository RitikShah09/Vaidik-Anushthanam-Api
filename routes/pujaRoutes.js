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
const { isAdmin } = require("../middlewares/auth");

router.get("/", isAdmin, allPuja);
router.get("/offer", isAdmin, offerPuja);
router.post("/create", isAdmin, createPuja);
router.post("/update/:id", isAdmin, updatePuja);
router.get("/:id", isAdmin, singlePuja);

router.post("/create-offer/:id",isAdmin, createOffer);
router.get("/delete-offer/:id",isAdmin, deleteOffer);
router.get("/delete/:id", isAdmin, deletePuja);

module.exports = router;
