const exerciseService = require('../services/exercise');

const logExercise = async (req, res) => {
  const { body, user } = req;
  body.userId = user.id;
  try {
    const result = await exerciseService.logExercise(body);
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const getAllExercises = async (req, res) => {
  try {
    const result = await exerciseService.getAllExercises();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const getExerciseById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await exerciseService.getExerciseById(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const updateExercise = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await exerciseService.updateExercise(id, body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const deleteExercise = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await exerciseService.deleteExercise(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  logExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise
}
