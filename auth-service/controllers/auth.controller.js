const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await authService.loginUser(req.body);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      const error = new Error("No refresh token");
      error.status = 401;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const { accessToken, refreshToken } = authService.generateTokens(decoded.userId);

    res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "lax", secure: false });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "lax", secure: false });

    res.json({ accessToken, refreshToken });
  } catch (err) {
    err.status = 403;
    next(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
};
