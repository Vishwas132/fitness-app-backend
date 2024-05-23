const express = require("express");
const router = express.Router();
const {
  logBodyDimension,
  getBodyDimensionById,
  updateBodyDimension,
  deleteBodyDimension
} = require("../controllers/bodyDimension");
const {authenticateToken} = require("../middlewares/auth");

router.post("/", authenticateToken, logBodyDimension);
router.get("/:id", authenticateToken, getBodyDimensionById);
router.put("/:id", authenticateToken, updateBodyDimension);
router.delete("/:id", authenticateToken, deleteBodyDimension);

module.exports = router;
