const router = require("express").Router({mergeParams: true});
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.use(cors());
//Theater route for list theaters
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;