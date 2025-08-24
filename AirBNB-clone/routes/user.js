const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {redirectUrl} = require("../middleware.js");
const userController = require("../controller/user.js");

router.route("/signup")
 .get(userController.renderSignupForm)
 .post(wrapAsync( userController.userCreated));

router.route("/login")
 .get( userController.renderLoginForm )
 .post(redirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
 userController.userLogin );

router.get("/logout", userController.userLogout);

module.exports = router;