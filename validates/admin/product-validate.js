module.exports.CreatePost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Vui lòng nhập lại thông tin!");
        req.redirect(`${systemConfig.prefixAdmin}/pages/products/create`);
        return;
    }
    next();
};