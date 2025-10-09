module.exports = (ObjectPagination, query, countProducts) => {
     if (query.page){
        ObjectPagination.currentPage = parseInt(query.page);
    }
    const totalPage = Math.ceil(countProducts/ObjectPagination.limitItem);
    ObjectPagination.totalPage = totalPage;

    ObjectPagination.skip = (ObjectPagination.currentPage - 1 ) * ObjectPagination.limitItem;
    return ObjectPagination;
}