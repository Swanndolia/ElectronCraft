const express = require("express");
const multer = require("../config/multer-config");
const router = express.Router();

const auth = require("../middleware/auth");

const usersCtrl = require("../controllers/users.js");

router.post("/signup", multer, usersCtrl.signup);
router.post("/login", multer, usersCtrl.login);
router.get("/:id", auth, usersCtrl.getOneUser);
router.get("/", auth, usersCtrl.getAllUsers);

module.exports = router;
