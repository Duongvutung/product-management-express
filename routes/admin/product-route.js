const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })
const router = express.Router();

const controller = require('../../controller/admin/product-controller');

//Danh sách sản phẩm
router.get('/', controller.index);
//Thay đổi trạng thái
router.patch('/change-status/:status/:id', controller.changeStatus);
//Thay đổi nhiều trạng thái
router.patch('/change-multi/', controller.changeMulti);
//Xóa sản phẩm (soft delete)
router.delete('/deleted/:id', controller.deletedItem)
//Khôi phục sản phẩm đã xóa
router.patch("/restore/:id", controller.restoreItem);
//Tạo mới sản phẩm [GET]
// router.get("/create", controller.create);
// //Tạo mới sản phẩm [POST]
// router.post("/create", controller.createPOST);

module.exports = router;