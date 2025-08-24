const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const {listSchema} = require("../schema.js");
const List = require("../models/list.js");
const {isLoggedIn} = require("../middleware.js");
const {isOwner} = require("../middleware.js");
const {validateList} = require("../middleware.js");
const {User} = require("../models/user.js");
const Review = require("../models/review.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
 //Index route
 .get( wrapAsync( listingController.index ))
 //CREATE route
.post( isLoggedIn, upload.single('list[image]'), validateList, wrapAsync( listingController.createListing))

//new route to saw all listings...
router.get("/new", isLoggedIn, listingController.renderNewForm );

router.route("/:id")
 //READ route
 .get( wrapAsync( listingController.showListing))
 //UPDATE route
 .put( isLoggedIn, isOwner, upload.single('list[image]'), validateList, wrapAsync( listingController.updateListing ))
 //Delete route.
.delete( isLoggedIn, isOwner, wrapAsync( listingController.destroyListing));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner,  wrapAsync( listingController.showEditForm)); 

module.exports = router;