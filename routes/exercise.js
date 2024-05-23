const express = require("express");
const router = express.Router();
const {
  getAllExercises,
  getExerciseById,
  logExercise,
  updateExercise,
  deleteExercise
} = require("../controllers/exercise");
const { authenticateToken } = require("../middlewares/auth");

router.get("/", getAllExercises);
router.get("/:id", getExerciseById);
router.post("/", authenticateToken, logExercise);
router.put("/:id", authenticateToken, updateExercise);
router.delete("/:id", authenticateToken, deleteExercise);

module.exports = router;
