const db = require(`../models/index.js`);
/**
 * Class Pages Controller
 */
class PagesController {
  /**
   * Page about
   * @param {*} req
   * @param {*} res
   */
  about(req, res) {
    res.render("pages/about");
  }

  /**
   * Page Concept
   * @param {*} req
   * @param {*} res
   */
  concept(req, res) {
    res.render("pages/concept");
  }

  contact(req, res) {
    res.render("pages/contact");
  }

  users(req, res) {
    db.Users.findAll().then(users => {
      const prenoms = ["Julien", "Justin", "Sylvain"];

      res.render("pages/users", {
        prenoms,
        users
      });
    });
  }
}

module.exports = PagesController;
