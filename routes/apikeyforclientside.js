const express = require("express");
const router = express.Router();
const { getAPIKey } = require("../controllers/stores");


router.route("/").get(getAPIKey);

module.exports = router;