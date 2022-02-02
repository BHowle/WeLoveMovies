const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.use(cors());
//review routes for update/delete
router.route("/:reviewId").delete(controller.delete).put(controller.update).all(methodNotAllowed);
//catch all route
router.route("/").all(methodNotAllowed);

module.exports = router;
