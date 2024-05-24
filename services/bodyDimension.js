const {BodyDimensions} = require("../models");

const logBodyDimension = async ({
  userId,
  weight,
  height,
  bicepSize,
  thighSize,
  bellySize
}) => {
  try {
    const bodyDimension = await BodyDimensions.create({
      userId,
      weight,
      height,
      bicepSize,
      thighSize,
      bellySize
    });
    return bodyDimension;
  } catch (error) {
    throw error;
  }
};

const getBodyDimensionById = async id => {
  try {
    const bodyDimension = await BodyDimensions.findByPk(id, {
      attributes: ["weight", "height", "bicepSize", "thighSize", "bellySize"]
    });
    return bodyDimension;
  } catch (error) {
    throw error;
  }
};

const updateBodyDimension = async (
  id,
  {weight, height, bicepSize, thighSize, bellySize}
) => {
  try {
    const bodyDimension = await BodyDimensions.update(
      {
        weight,
        height,
        bicepSize,
        thighSize,
        bellySize
      },
      {
        where: {id},
        returning: true
      }
    );
    if (bodyDimension[1][0] === null) {
      throw new Error("Body dimension not found");
    }
    return bodyDimension[1][0];
  } catch (error) {
    throw error;
  }
};

const deleteBodyDimension = async id => {
  try {
    await BodyDimensions.destroy({where: {id}});
    return {message: "Body dimension deleted successfully"};
  } catch (error) {
    throw error;
  }
};

module.exports = {
  logBodyDimension,
  getBodyDimensionById,
  updateBodyDimension,
  deleteBodyDimension
};
