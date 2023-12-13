const express = require("express");
const router = express.Router();
const { getAllStores, addStore, getAPIKey } = require("../controllers/stores");


router.route("/")
    .get(getAllStores)
    .post(addStore);

router.route("/").get(getAPIKey);

module.exports = router;