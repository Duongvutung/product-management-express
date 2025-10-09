// [GET] /products
const Product = require('../../models/products-models');

module.exports.index = async (req, res) => {
    try {
        const allProducts = await Product.find({ 
            status: 'active',
            deleted: false // Thêm điều kiện để chỉ lấy những sản phẩm chưa bị xóa
        }).sort({postition:"desc"})

        const updatedProducts = allProducts.map(item => {
            const newItem = item.toObject(); // Chuyển đổi tài liệu Mongoose thành đối tượng JavaScript
            newItem.Newprice = ((item.price * (100 - item.discount)) / 100).toFixed(2);
            return newItem;
        });

        // console.log(updatedProducts); // Dùng updatedProducts để log

        res.render('client/pages/products/index', {
            pageTitle: 'Trang chủ sản phẩm',
            products: updatedProducts,
        });

    } catch (error) {
        console.error('Lỗi khi truy vấn dữ liệu:', error);
        res.status(500).send('Lỗi máy chủ');
    }
};

