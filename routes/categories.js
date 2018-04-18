const express = require("express");
const router = express.Router();

/**
 * Routing for Articles
 */
const CategoriesController = require("../controllers/CategoriesController");
const controller = new CategoriesController();

// route listant les articles
router.get("/liste", (req, res) => controller.liste(req, res));
router.get("/creer", (req, res) => controller.creer(req, res));
router.post("/enregistrer", (req, res) => controller.enregistrer(req, res));
router.get("/voir/:id", (req, res) => controller.voir(req, res));
router.get("/suppression/:id", (req, res) => controller.suppression(req, res));
router.get("/modifier/:id", (req, res) => controller.modifier(req, res));
router.post("/modifier/:id", (req, res) => controller.miseajour(req, res));

module.exports = router;
