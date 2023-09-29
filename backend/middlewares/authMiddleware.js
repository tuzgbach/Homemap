const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asynHandler = require("express-async-handler");

const authMiddleware = asynHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error(
        "Mã thông báo không được ủy quyền đã hết hạn, vui lòng đăng nhập lại "
      );
    }
  } else {
    throw new Error("Không có mã thông báo nào được đính kèm vào tiêu đề");
  }
});

const isAdmin = asynHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("Bạn không phải admin");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
