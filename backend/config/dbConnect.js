const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("Kết nối database thành công");
  } catch (error) {
    console.log("DAtabase error");
  }
};
module.exports = dbConnect;
