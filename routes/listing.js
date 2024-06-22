const express =require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggendIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggendIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing))


//New route
router.get("/new",isLoggendIn,listingController.renderNewForm);


router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggendIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggendIn,isOwner,wrapAsync(listingController.destroyListing))


router.get("/:id/edit",isLoggendIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports=router;