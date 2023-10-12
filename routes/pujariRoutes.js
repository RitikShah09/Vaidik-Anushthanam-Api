const express = require("express");
const {
  pujariSignup,
  pujariSignin,
  pujariSignout,
  pujariSendMail,
  currentPujari,
  pujariForgetLink,
  pujariResetPassword,
  pujariUpdate,
  pujariAvtar,
} = require("../controllers/pujariControllers");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.get("/", isAuthenticated, currentPujari);

router.post("/signup", pujariSignup);
router.post("/signin", pujariSignin);
router.get("/signout", pujariSignout);
router.post("/send-mail", pujariSendMail);

router.post("/forget-link", pujariForgetLink);

router.post("/reset-password/:id", isAuthenticated, pujariResetPassword);

router.post("/update/:id", isAuthenticated, pujariUpdate);

router.post("/avtar/:id", isAuthenticated, pujariAvtar);

module.exports = router;
