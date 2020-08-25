var express = require("express")
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose")
var methodOverride = require("method-override")
var Campground = require("./models/campground")
var Comment = require("./models/comment")
var passport = require("passport")
var LocalStrategy = require("passport-local")
var User = require("./models/user")
var campgroundRoutes = require("./routes/campgrounds")
var commentRoutes = require("./routes/comments")
var indexRoutes = require("./routes/index")
var flash = require("connect-flash")
var moment = require("moment")
var port = process.env.PORT || 3000;



mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.log("error", err.message)
})
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"))
app.use(flash());

// passport config
app.use(require("express-session")({
    secret: "all your base are belong to us",
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next();
});

// route requirements
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes)



app.listen(port, function () {
    console.log("Server Has Started!");
  });