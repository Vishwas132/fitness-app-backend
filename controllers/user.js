const userService = require("../services/user");

const register = async (req, res) => {
  const {email, password, firstName, lastName} = req.body;
  try {
    const user = await userService.register({
      email,
      password,
      firstName,
      lastName
    });
    return res.status(201).json({message: "User registered successfully"});
  } catch (error) {
    console.error(error);
    return res.status(400).json({error: error.message});
  }
};

const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const {accessToken, refreshToken} = await userService.login({
      email,
      password
    });
    return res.status(200).json({accessToken, refreshToken});
  } catch (error) {
    console.error(error);
    return res.status(400).json({error: error.message});
  }
};

const logout = async (req, res) => {
  const {refreshToken} = req.body;
  const userId = req.user.id;
  try {
    await userService.logout({refreshToken, userId});
    return res.status(200).json({message: "User logged out successfully"});
  } catch (error) {
    console.error(error);
    return res.status(400).json({error: error.message});
  }
};

module.exports = {register, login, logout};
module.exports = {register, login, logout};
