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
    db.Todo.findAll().then(todos => {
      res.render("pages/about", {
        todos: todos
      });
    });
  }

  see(req, res) {
    db.Todo.findById(req.params.id).then(todo => {
      res.render("pages/see", {
        todo: todo
      });
    });
  }

  add(req, res) {
    res.render("pages/add");
  }

  store(req, res) {
    db.Todo.create(req.body).then(() => res.redirect("/about"));
  }
}

module.exports = PagesController;
