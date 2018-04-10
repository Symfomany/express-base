const db = require(`../models/index.js`);
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
    // récupérer mes données en POST
    console.log(req.body);
    db.Articles.create(req.body).then(article =>
      res.redirect("/articles/liste")
    );
  }

  voir(req, res) {
    // req.params : parametre en URL

    db.Articles.findById(req.params.id).then(article => {
      res.render("articles/voir", { article });
    });
  }
}

module.exports = ArticlesController;
