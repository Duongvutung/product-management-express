const multer = require("multer");
const path = require("path");

// Cấu hình nơi lưu trữ và tên file khi upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/")); // nơi lưu file
  },
  filename: function (req, file, cb) {
    // đặt tên file duy nhất (thời gian + tên gốc)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});

// Chỉ cho phép upload các file ảnh
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ những ảnh có đuôi (jpeg, jpg, png, gif) được cho phép!"));
  }
};

// Tạo middleware upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // giới hạn 5MB
});

module.exports = upload;
