const db = require(`../models/index.js`);
const bcrypt = require("bcrypt-nodejs");

/**
 * Class Auth Controller
 */
class AuthController {
  login(req, res) {
    // req.flash("error") : permet de récupérer le message flash par sa clef: error
    res.render("auth/login", { message: req.flash("error") });
  }
  logout(req, res) {
    req.logout(); // suppresion de la session en cours
    res.redirect("/auth/login");
  }

  register(req, res) {
    if (req.method == "POST") {
      bcrypt.hash(req.body.password, null, null, (err, hash) => {
        db.Users.create({ ...req.body, ...{ password: hash } }).then(user => {
          res.redirect("/auth/login");
        });
      });
    } else {
      res.render("auth/register");
    }
  }
}

module.exports = AuthController;
