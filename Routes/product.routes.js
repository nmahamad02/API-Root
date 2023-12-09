module.exports = (app) => {
    const ProdContrllr = require('../Controllers/product.controllers.js');

    // GET PRODUCT LOCATION DETAILS 
    app.get('/api/product/productlocation/:pcode/:year/:compcode', ProdContrllr.getProductLocation);
    // GET CATEGORY DETAILS 
    app.get('/api/product/getCategoryDetails', ProdContrllr.getCategoryDetails);
    // GET SUB CATEGORY DETAILS 
    app.get('/api/product/getSubCategoryDetails', ProdContrllr.getSubCategoryDetails);
    //GET ALL PRODUCT LIST
    app.get('/api/product/getProductList', ProdContrllr.getProductList);
    //GET ALL PRODUCT LIST FORM PRODUCTID   
    app.get('/api/product/getProductListFromProductId/:pcode/:compcode/:year', ProdContrllr.getProductListFromProductId);

};