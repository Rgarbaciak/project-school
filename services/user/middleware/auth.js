const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, firstName, lastName, res) => {
  const token = jwt.sign(
    { userId, firstName, lastName },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("jwt", token, { httpOnly: true, secure: true });

  return token;
};

module.exports = generateTokenAndSetCookie;
