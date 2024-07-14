const express = require("express");
const booksController = require("./books.controller");
const { isAuthor, populateAuthor } = require("./books.middlewares");
const { isLoggedIn } = require("../auth/auth.middlewares");

const router = express.Router();

router.use(isLoggedIn);
router.use(populateAuthor);

router.get("/", booksController.getAll);
router.get("/:id", booksController.getOne);
router.post("/", booksController.create);
router.put("/:id", isAuthor, booksController.update);
router.delete("/:id", isAuthor, booksController.delete);
router.patch("/:id", isAuthor, booksController.update); // Using update for patch
router.post("/search", booksController.search);

module.exports = router;
