/*********************************************************************************************************************************************
 * *************************************************************************
 * *************************************************************************
 *  Configuration of Framework Express
 * *************************************************************************
 * *************************************************************************
 ******************************************************************************************************************************************/

const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const debug = require("debug")("http"); // Module for Debug
const logger = require("morgan"); // Module for Log
const bodyParser = require("body-parser"); // Module for POST/GET datas
const cookieParser = require("cookie-parser"); // Module for cookie in Session
const sassMiddleware = require("node-sass-middleware");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt-nodejs");
const colors = require("colors/safe");
const db = require(`./models/index.js`);
const loggedIn = require("./middlewares/logged");
const fileUpload = require("express-fileupload");
const flash = require("express-flash");

app.use(express.static(__dirname + "/public")); // all statics files in /public
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(fileUpload());

app.use(logger("dev"));
app.use(bodyParser.json()); // API response en JSON
app.use(
  // donnée en get post non encodé par l'URL
  bodyParser.urlencoded({
    extended: false
  })
);

/**
 * Configuration of Session
 */
app.use(
  session({
    secret: "*****JeSuisLaClefSecrèteWild2018*****",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 100 * 60 * 60 * 24 * 30 } // lifetime of cookie = 30 days
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, email, password, done) => {
      const generateHash = password =>
        bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

      const hashPassword = generateHash(password);
      db.Users.findOne({
        where: {
          email: email
        }
      })
        .then(user => {
          if (!user) {
            return done(null, false, { message: "password invalid..." });
          } else {
            bcrypt.compare(password, user.password, (err, res) => {
              if (res === false) {
                return done(null, false, { message: "password invalid..." });
              }
            });
          }
          return done(null, user);
        })
        .catch(err => {
          return done(err, false);
        });
    }
  )
);

// Serialize and Unserialize an User
passport.serializeUser((user, done) => done(null, user.id));
// saved to session req.session.passport.user = {id:'..'}
passport.deserializeUser((id, done) => {
  db.Users.findOne({
    // Using sequelize model functoin
    where: {
      id: id
    }
  }).then(user => {
    if (user == null) {
      done(new Error("Wrong user id."));
    }
    done(null, user); // Standerd deserailize callback
  });
});
// user object attaches to the request as req.user

// Initialize Passport Module
app.use(passport.initialize());
app.use(passport.session());

/**
 * Store in global variables
 */
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user; // this line
  next();
});

/*********************************************************************************************************************************************
 * *************************************************************************
 * *************************************************************************
 *  Routing
 * *************************************************************************
 * *************************************************************************
 ******************************************************************************************************************************************/

/**
 * Routing
 */
const pages = require("./routes/pages");
const articles = require("./routes/articles");
const categories = require("./routes/categories");

app.get("/", (req, res) => res.render("index"));
app.use("/", pages);

// Jeu de route propre à la gestion d'articles
app.use("/articles", articles);
app.use("/categories", categories);

// Handle 404
app.use((req, res) => {
  res.status(404);
  res.render("errors/404");
});

// Handle 500
app.use((error, req, res, next) => {
  res.status(500);
  console.error(colors.bold.red.underline(error.stack));
  res.render("errors/500", {
    message: error.message,
    stack: error.stack,
    error: error
  });
});

app.use(flash());

/*********************************************************************************************************************************************
 * *************************************************************************
 * *************************************************************************
 *  Running Server
 * *************************************************************************
 * *************************************************************************
 ******************************************************************************************************************************************/

app.listen(port, err => {
  console.clear();
  if (!err) console.log(colors.rainbow("Site is live... Go ahead"));
  else console.log(colors.rainbow(err));
  console.log("🤓");
});
