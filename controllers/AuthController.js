const db = require(`../models/index.js`);

/**
 * Class Auth Controller
 */
class AuthController {
  login(req, res) {
    res.render("auth/login", { message: req.flash("error") });
  }
  logout(req, res) {
    req.logout();
    res.redirect("/auth/login");
  }
}

module.exports = AuthController;
