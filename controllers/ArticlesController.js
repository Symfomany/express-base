const db = require(`../models/index.js`);
const validator = require("validator");
let form = require("express-form"),
  filter = form.filter,
  validate = form.validate;

/**
 * Class Articles Controller
 */
class ArticlesController {
  /**
   * Pages Lister les articles
   * @param {*} req
   * @param {*} res
   */
  liste(req, res) {
    // je récupères tous les articles
    db.Articles.findAll().then(articles => {
      // puis je l'envois à la vue
      res.render("articles/liste", {
        articles
      });
    });
  }

  creer(req, res) {
    res.render("articles/creer");
  }

  enregistrer(req, res) {
    let datas = req.body;

    const monFichier = req.files.photo;
    monFichier.mv(`public/uploads/${monFichier.name}`, () => {
      datas.photo = monFichier.name;

      db.Articles.create(datas).then(article =>
        res.redirect("/articles/liste")
      );
    });
  }

  voir(req, res) {
    // req.params : parametre en URL

    db.Articles.findById(req.params.id).then(article => {
      res.render("articles/voir", { article });
    });
  }
}

module.exports = ArticlesController;
