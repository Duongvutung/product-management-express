const mongoose = require('mongoose');
require('dotenv').config();  // Đọc file .env

module.exports.connect = async () => {
  try {
    // Chỉ cần truyền mỗi URI thôi, Mongoose 7 tự xử lý
    await mongoose.connect(process.env.DATABASE_URL);

    console.log('✅ Connect to MongoDB successfully');
  } catch (error) {
    console.error('❌ Connect to MongoDB failed:', error.message);
  }
};
