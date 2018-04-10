const express = require("express");
const router = express.Router();

/**
 * Routing for Articles
 */
const ArticlesController = require("../controllers/ArticlesController");
const controller = new ArticlesController();

// route listant les articles
router.get("/liste", (req, res) => controller.liste(req, res));
router.get("/creer", (req, res) => controller.creer(req, res));
router.post("/enregistrer", (req, res) => controller.enregistrer(req, res));
router.get("/voir/:id", (req, res) => controller.voir(req, res));

module.exports = router;
