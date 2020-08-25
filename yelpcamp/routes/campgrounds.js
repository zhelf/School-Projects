var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
const campground = require("../models/campground");
var middleware = require("../middleware")


router.get("/", function(req,res){
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log()
        } else {
            res.render("campgrounds/index", {campgrounds:allcampgrounds, currentUser: req.user});
        }
    })
    
})

router.post("/", middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description
    var price = req.body.price
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {
        name : name, 
        image: image, 
        description: desc, 
        price: price, 
        author: author
    }
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
            res.redirect("/campgrounds")
        }
    })
    
})

router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new")
})

router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })    
})

// edit route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground})
    }); 
});

// update route
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds")
        } else {
            req.flash("success", "Campground Updated.")
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

// destroy route
router.delete("/:id", middleware.checkCampgroundOwnership, async(req, res) => {
    try {
        let foundCampground = await Campground.findById(req.params.id);
        await foundCampground.remove();
        req.flash("success", "Campground removed")
        res.redirect("/campgrounds")
    } catch (error) {
        console.log(error.message)
        res.redirect("/campgrounds")
    }
})



module.exports = router;