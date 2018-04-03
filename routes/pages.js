const express = require("express");
const router = express.Router();

/**
 * Routing for Articles
 */
const PagesController = require("../controllers/PagesController");
const controller = new PagesController();

router.get("/about", (req, res) => controller.about(req, res));

module.exports = router;
