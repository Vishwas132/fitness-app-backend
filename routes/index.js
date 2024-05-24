const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const authRouter = require("./auth");
const exerciseRouter = require("./exercise");
const bodyDimensionsRouter = require("./bodyDimension");

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/exercise", exerciseRouter);
router.use("/body-dimension", bodyDimensionsRouter);

router.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to fitness-app",
  });
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({message: "Something broke!"});
});

module.exports = router;
