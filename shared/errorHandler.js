// shared/errorHandler.js
module.exports = (err, req, res, next) => {
    console.error("🔥 Server Error:", err.message);
  
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  };
  