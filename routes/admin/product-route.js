const express = require('express');
const multer = require('multer')
const router = express.Router();

const validate = require("../../validates/admin/product-validate")
const upload = require("../../middlewares/upload"); // ✅ chỉ giữ dòng này
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
router.get("/create", controller.create);
//Tạo mới sản phẩm [POST]
router.post("/create", upload.single("thumbnail"), validate.CreatePost, controller.createPOST);
//Sửa sản phẩm[GET]
router.get("/edit/:id", controller.edit);
//Sửa sản phẩm[PATCH]
router.patch("/edit/:id", upload.single("thumbnail"), validate.CreatePost, controller.editPatch);
//Xem chi tiết sản phẩm[GET]
router.get("/detail/:id", controller.detail);

module.exports = router;
