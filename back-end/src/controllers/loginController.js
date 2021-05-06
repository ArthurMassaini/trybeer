const loginService = require('../services/loginService');

const STATUS_OK = 200;
const STATUS_UNAUTHORIZED = 401;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const result = await loginService.loginUser(email, password);

  if (result === 'All fields must be filled' || result === 'Incorrect username or password') {
    res.status(STATUS_UNAUTHORIZED).json({ message: result });
  } else {
    res
      .status(STATUS_OK)
      .json({
        token: result[0],
        role: result[1].role,
        name: result[1].name,
        id: result[1].id,
        email,
      });
  }
};

module.exports = { loginUser };
