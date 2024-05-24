const bodyDimensionService = require("../services/bodyDimension");
const {logger} = require("../logger");

const getBodyDimensionById = async (req, res) => {
  const {id} = req.params;
  try {
    const bodyDimension = await bodyDimensionService.getBodyDimensionById(id);
    return res.json(bodyDimension);
  } catch (error) {
    logger.error("Controller -- getBodyDimensionById -- ", error);
    return res.status(400).json({error: error.message});
  }
};

const logBodyDimension = async (req, res) => {
  try {
    const {weight, height, bicepSize, thighSize, bellySize} = req.body;
    const userId = req.user.id;
    const bodyDimension = await bodyDimensionService.logBodyDimension({
      userId,
      height,
      weight,
      bicepSize,
      thighSize,
      bellySize
    });
    return res.json(bodyDimension);
  } catch (error) {
    logger.error("Controller -- logBodyDimension -- ", error);
    return res.status(400).json({error: error.message});
  }
};

const updateBodyDimension = async (req, res) => {
  const {id} = req.params;
  const {weight, height, bicepSize, thighSize, bellySize} = req.body;
  try {
    const bodyDimension = await bodyDimensionService.updateBodyDimension(id, {
      weight,
      height,
      bicepSize,
      thighSize,
      bellySize
    });
    return res.json(bodyDimension);
  } catch (error) {
    logger.error("Controller -- updateBodyDimension -- ", error);
    return res.status(400).json({error: error.message});
  }
};

const deleteBodyDimension = async (req, res) => {
  const {id} = req.params;
  try {
    await bodyDimensionService.deleteBodyDimension(id);
    return res.json({message: "Body dimension deleted successfully"});
  } catch (error) {
    logger.error("Controller -- deleteBodyDimension -- ", error);
    return res.status(400).json({error: error.message});
  }
};

module.exports = {
  getBodyDimensionById,
  logBodyDimension,
  updateBodyDimension,
  deleteBodyDimension
};
