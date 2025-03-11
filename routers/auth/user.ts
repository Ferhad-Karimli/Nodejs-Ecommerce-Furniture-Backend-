const express = require("express");
const {
  userAdd,
  authUser,
  userList,
  singleUser,
} = require("../../controllers/auth/user");

const isAdmin = require("../../middlewares/isAdmin");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/api/register", userAdd);
router.post("/api/login", authUser);
router.get("/api/users", userList);
router.get("/:id", [auth, isAdmin], singleUser);

module.exports = router;
