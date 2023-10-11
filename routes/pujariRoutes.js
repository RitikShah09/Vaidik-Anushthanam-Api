const express = require("express");
const {
  homePage,
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

router.get("/", homePage);

// POST/pujari
router.post("/", isAuthenticated, currentPujari);

// POST/pujari/Signup
router.post("/signup", pujariSignup);
router.post("/signin", pujariSignin);
router.get("/signout", pujariSignout);

//SendMail
router.post("/send-mail", pujariSendMail);

// Get/pujari/forget-link
router.post("/forget-link", pujariForgetLink);

// Post/pujari/reset-password/:pujariId
router.post(
  "/reset-password/:id",
  isAuthenticated,
  pujariResetPassword
);

// Post/pujari/update/:pujariId
router.post("/update/:id", isAuthenticated, pujariUpdate);

// upload avtar
router.post("/avtar/:id", isAuthenticated, pujariAvtar);


module.exports = router;
