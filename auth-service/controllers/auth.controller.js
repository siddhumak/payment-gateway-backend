const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");   // <-- IMPORTANT FIX

exports.register = async (req, res) => {
  try {
    res.json(await authService.registerUser(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { accessToken, refreshToken } = await authService.loginUser(req.body);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken
    });

  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const { accessToken, refreshToken } = authService.generateTokens(decoded.userId);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });

    return res.json({ accessToken, refreshToken });

  } catch (err) {
    console.log("Refresh error:", err.message);
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
};
