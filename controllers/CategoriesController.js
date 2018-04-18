const db = require(`../models/index.js`);

/**
 * Class Categories Controller
 */
class CategoriesController {
  liste(req, res) {
    db.Categories.findAll().then(resultat => {
      res.render("categories/liste", {
        categories: resultat
      });
    });
  }

  creer(req, res) {
    res.render("categories/creer");
  }

  modifier(req, res) {
    db.Categories.findById(req.params.id).then(category => {
      res.render("categories/modifier", { category });
    });
  }

  enregistrer(req, res) {
    console.log(req.body);
    db.Categories.create(req.body).then(resultat => {
      console.log(resultat);
      res.redirect("/categories/liste");
    });
  }

  voir(req, res) {}

  suppression(req, res) {
    db.Categories.findById(req.params.id).then(category => {
      req.flash("supprimer", "Votre catégorie a bien été supprimé");
      category.destroy().then(() => {
        res.redirect("/categories/liste");
      });
    });
  }

  miseajour(req, res) {
    db.Categories.update(
      {
        titre: req.body.titre,
        description: req.body.description
      },
      {
        where: { id: req.params.id }
      }
    ).then(resultat => {
      res.redirect("/categories/liste");
    });
  }
}

module.exports = CategoriesController;
