/**
 * Middleware to connect
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function loggedIn(req, res, next) {
  if (req.user) {
    // if request contains the user
    next(); // call next
  } else {
    return res.redirect("/auth/signin"); // throwing unauthorized
  }
}

module.exports = loggedIn;
