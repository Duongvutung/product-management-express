const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        discountPercentage: { type: Number, default: 0 },
        stock: { type: Number, default: 0 },
        thumbnail: { type: String, required: true },
        status: { type: String, enum: ["active", "inactive"], default: "active" },
        position: { type: Number, default: 0 },
        slug: { //Slug dùng để tạo đường dẫn dễ đọc, ưu nhìn
            type: String,
            slug: "title",
            unique: true
        },
        deleted: { type: Boolean, default: false },
        deletedAt: {type:Date, default: null}
    },
    { timestamps: true } // lưu createdAt, updatedAt
);

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
