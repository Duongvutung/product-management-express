// Đây là 1 file trong thư mục Helpers: Mục đích là để trợ giúp cho việc code dễ dàng hơn
// Helpers/FilterStatus.js
module.exports = (query) => {
    let FilterStatus = [
        {
            name: "Tất cả sản phẩm",
            status: "",
            class: ""
        },
        {
            name: "Sản phẩm Active",
            status: "active",
            class: ""
        },
        {
            name: "Sản phẩm Inactive",
            status: "inactive",
            class: ""
        },
    ];

    let Find = {
        deleted: false,
    };

    if (query.status) {
        const index = FilterStatus.findIndex(item => item.status == query.status);
        if (index !== -1) {
            FilterStatus[index].class = "active";
            Find.status = query.status;   // ✅ thêm điều kiện lọc
        }
    } else {
        const index = FilterStatus.findIndex(item => item.status == "");
        if (index !== -1) {
            FilterStatus[index].class = "active";
        }
    }

    return {
        FilterStatus,
        Find
    };
};
