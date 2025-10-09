// helpers/Search.js
module.exports = (query) => {
    let result = {
        keyword: "",
        regex: null
    };

    if (query.keyword) {
        result.keyword = query.keyword;
        result.regex = new RegExp(result.keyword, "i"); // "i" => không phân biệt hoa/thường
    }
    return result;
};
