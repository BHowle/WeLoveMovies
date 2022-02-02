const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.use(cors());
//movies route's
router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
//specific movie review
router
  .route("/:movieId/reviews")
  .get(controller.listReviews)
  .all(methodNotAllowed);
//specific theaters for movie
router
  .route("/:movieId/theaters")
  .get(controller.listTheaters)
  .all(methodNotAllowed);

module.exports = router;
