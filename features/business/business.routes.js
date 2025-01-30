const express = require("express");
const businessController = require("./business.controller");
const { isAdmin, isLoggedIn } = require("../auth/auth.middlewares");

const router = express.Router();

router.use(isLoggedIn);
router.use(isAdmin);

router.get("/", businessController.getAll);
router.get("/:id", businessController.getOne);
router.post("/", businessController.create);
router.put("/:id", businessController.update);
router.delete("/:id", businessController.delete);
router.patch("/:id", businessController.update); // Using update for patch
router.post("/search", businessController.search);

module.exports = router;
