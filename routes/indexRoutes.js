const express = require("express");
const {
  homePage,
  userSignup,
  userSignin,
  userSignout,
  userSendMail,
  currentUser,
  userForgetLink,
  userResetPassword,
  userUpdate,
  userAvtar,
  userAddress,
  bookPuja,
} = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.get("/", homePage);

// POST/User
router.get("/user", isAuthenticated, currentUser);

// POST/user/Signup
router.post("/user/signup", userSignup);
router.post("/user/signin", userSignin);
router.get("/user/signout", userSignout);
router.post("/user/add-address", isAuthenticated, userAddress);
router.post("/user/book-puja/:id", isAuthenticated, bookPuja);


//SendMail
router.post("/user/send-mail", userSendMail);

// Get/user/forget-link
router.post("/user/forget-link", userForgetLink);

// Post/user/reset-password/:userId
router.post("/user/reset-password/:id", isAuthenticated, userResetPassword);

// Post/user/update/:userId
router.post("/user/update/:id", isAuthenticated, userUpdate);

// upload avtar
router.post("/user/avtar/:id", isAuthenticated, userAvtar);

module.exports = router;
