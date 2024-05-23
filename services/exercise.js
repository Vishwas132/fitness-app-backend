const {Exercises} = require("../models");

const logExercise = async ({
  userId,
  exerciseName,
  description,
  duration
}) => {
  try {
    const exercise = await Exercises.create({
      userId,
      name: exerciseName,
      description,
      duration
    });
    return exercise;
  } catch (error) {
    throw error;
  }
};

const getAllExercises = async () => {
  try {
    const exercises = await Exercises.findAll();
    return exercises;
  } catch (error) {
    throw error;
  }
};

const getExerciseById = async id => {
  try {
    const exercise = await Exercises.findByPk(id, {
      attributes: [
        "id",
        "userId",
        ["name", "exerciseName"],
        "description",
        "duration"
      ]
    });
    if (!exercise) {
      throw new Error("Exercises not found");
    }
    return exercise;
  } catch (error) {
    throw error;
  }
};

const updateExercise = async (
  id,
  {exerciseName, description, duration, time, day, date}
) => {
  try {
    const exercise = await Exercises.update(
      {
        name: exerciseName,
        description,
        duration,
        updatedAt: new Date().toISOString(),
      },
      {
        where: {
          id
        },
        returning: true
      }
    );
    if (exercise[1][0] === null) {
      throw new Error("Exercise not found");
    }
    const updatedExercise = exercise[1][0];
    return updatedExercise;
  } catch (error) {
    throw error;
  }
};

const deleteExercise = async id => {
  try {
    const exercise = await Exercises.destroy({
      where: {
        id
      }
    });
    if (!exercise) {
      throw new Error("Exercise not found");
    }
    return {
      message: "Exercise deleted successfully"
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  logExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise
};
