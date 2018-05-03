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

// Initialize Flash
app.use(flash());

/**
 * For APIs
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

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
 * Middleware
 */

/**
 * Routing
 */

const pages = require("./routes/pages");

app.get("/", (req, res) => res.render("index"));
app.use("/", pages);

/**
 * 404 Page
 */
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
