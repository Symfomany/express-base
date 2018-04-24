const db = require(`../models/index.js`);

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
}

module.exports = AuthController;
