// [GET] /admin/product
// ĐÂY LÀ FILE ĐỂ LẤY DATA CHO TRANG ADMIN(XỬ LÝ PHÍA BACKEND)

const systemConfig = require('../../config/system');
const Product = require('../../models/products-models');
const FilterStatusHelpers = require('../../helpers/FilterStatus');
const SearchHelpers = require('../../helpers/Search');
const PaginationHelpers = require('../../helpers/Pagination');
// [GET] /admin/product
module.exports.index = async (req, res) => {
  // Lấy FilterStatus và điều kiện lọc ban đầu
  const { FilterStatus, Find } = FilterStatusHelpers(req.query);

  // Lấy điều kiện search
  const search = SearchHelpers(req.query);
  if (search.regex) {
    Find.title = search.regex;
  }

  //Pagination: Phân trang
  const countProducts = await Product.countDocuments(Find);
  let ObjectPagination = PaginationHelpers(
    {
      currentPage: 1,
      limitItem: 10
    },
    req.query,
    countProducts
  );
  //End Pagination

  // Truy vấn sản phẩm
  const products = await Product.find(Find)
    .sort({ postition: "desc" })
    .limit(ObjectPagination.limitItem)
    .skip(ObjectPagination.skip);

  // Render ra view
  res.render('admin/pages/products/index', {
    pageTitle: 'Product Management',
    products: products,
    FilterStatus,
    keyword: search.keyword,
    pagination: ObjectPagination
  });
};
//End /admin/product

// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const id = req.params.id;

    // Update trạng thái
    await Product.updateOne({ _id: id }, { status: status });

    req.flash("success", "Cập nhật thành công!")
    // Quay lại trang trước hoặc về danh sách
    res.redirect(req.get("Referer") || "/admin/products");
  } catch (error) {
    console.error("Error change status:", error);
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
//End /admin/product/change-status/:status/:id

//[PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const type = req.body.type;
    const ids = req.body.ids.split(",").filter(id => id.trim() !== "");

    switch (type) {
      case "active":
        await Product.updateMany(
          { _id: { $in: ids } },
          { status: "active" }
        );
        req.flash("success", `Cập nhật thành công ${ids.length} sản phẩm Hoạt động sang Không hoạt động `)
        break;
      case "inactive":
        await Product.updateMany(
          { _id: { $in: ids } },
          { status: "inactive" }
        );
        req.flash("success", `Cập nhật thành công ${ids.length} sản phẩm Không hoạt động sang Hoạt động `)
        break;
      case "delete-all":
        await Product.updateMany(
          { _id: { $in: ids } },
          { deleted: true, deletedAt: new Date() }
        );
        break;
      default:
        break;
      case "change-position":
        for (const item of ids) {
          let [ids, position] = (item.split("-"));
          position = parseInt(position);

          await Product.updateOne(
            { _id: id },
            { position: position }
          );
        }
        break;
    };

    res.redirect(`${systemConfig.prefixAdmin}/products`);
  } catch (error) {
    console.error(error);
    req.flash("error", "Có lỗi xảy ra khi thay đổi trạng thái!");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  };
};
//End /admin/product/change-multi

//[DELETE] /admin/product/delete/:id
module.exports.deletedItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({ _id: id }, {
    deleted: true,
    deletedAt: new Date()
  })
  req.flash("success", `Xoá thành công  sản phẩm!`)
  res.redirect(`${systemConfig.prefixAdmin}/products`)
};
//End /admin/products/delete/:id

//[PATCH] /admin/products/restore/:id
module.exports.restoreItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({ _id: id }, {
    deleted: false,
    deletedAt: new Date()
  });
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};
//End /admin/product/restore/:id

//[GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm"
  });
}
//End [GET] /admin/products/create

//[POST] /admin/products/create
module.exports.createPOST = async (req, res) => {
  // if(!req.body.title){
  //   req.flash("error", "Vui lòng nhập lại thông tin!");
  //   req.redirect(`${systemConfig.prefixAdmin}/pages/products/create`);
  //   return;
  // }
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position == " ") {
    const countProducts = await Product.count();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  req.body.thumbnail = `uploads/${req.file.filename}`;
  const product = new Product(req.body);
  await product.save();

  res.redirect(`${systemConfig.prefixAdmin}/products`)
};

//[GET] /admin/products/edit:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }

    const product = await Product.findOne(find);
    console.log(product)

    res.render("admin/pages/products/edit", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product:product
    });
  } catch (error) {
    req.flash("error", "Vui lòng nhập id hợp lệ!");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

//[PATCH] /admin/products/edit:id
module.exports.editPatch = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if(req.file){
     req.body.thumbnail = `uploads/${req.file.filename}`;
  };
  try {
    await Product.updateOne({_id: id}, req.body);
    req.plash("success", "Sửa sản phẩm thành công!");
  } catch (error) {
    req.plash("error", "Sửa thất bại")
  }
  res.redirect(`${systemConfig.prefixAdmin}/products`)
};

//[GET] /admin/products/detail:id
module.exports.detail = async (req, res) => {
  try {
    const product = await Product.findOne({ 
      _id: req.params.id, 
      deleted: false 
    });

    res.render("admin/pages/products/detail", {
      pageTitle: "Chi tiết sản phẩm",
      product
    });
  } catch (error) {
    req.flash("error", "Không tìm thấy sản phẩm!");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
//End /admin/products/detail:id