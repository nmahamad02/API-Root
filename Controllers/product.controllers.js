const mssql = require('mssql');

//Product_location
exports.getProductLocation = (req, res) =>
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT L.LOCATIONNAME, ISNULL(R.OPENING_QTY,0) OPENING_QTY, ISNULL(R.BOPENING_QTY,0) BOPENING_QTY, 
    ISNULL(R.TOTAL_IN,0) TOTAL_IN, ISNULL(R.BTOTAL_IN,0) BTOTAL_IN, ISNULL(R.TOTAL_OUT,0) TOTAL_OUT, 
    ISNULL(R.BTOTAL_OUT,0) BTOTAL_OUT, ISNULL(R.CURRENT_QTY,0) CURRENT_QTY, ISNULL(R.BCURRENT_QTY,0) BCURRENT_QTY, 
    L.LOCATIONID, CASE WHEN R.LOCATION_ID IS NULL THEN 'NOT FOUND' ELSE 'FOUND' END STOCK_RECORD_FOUND FROM LOCATION L 
    LEFT OUTER JOIN PRODUCT_LOCATION_RELATION R ON L.COMP_CODE=R.COMP_CODE AND L.LOCATIONID=R.LOCATION_ID 
    AND R.PRODUCT_ID='${req.params.pcode}' AND R.YEAR='${req.params.year}' WHERE L.COMP_CODE='${req.params.compcode}' ORDER BY L.LOCATIONNAME`;
    request.query(queryStr, function (err, recordset) {
       if(err)
       {
           console.log(error);
       }
       else
       {
           if (recordset.recordset.toString() == '')
           {
               console.log("Data for your request is empty");
           }
           res.send(recordset);
       }
   });
};

exports.getCategoryDetails = (req, res) =>
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT CATEGORY_ID,CATEGORY_CD,CATEGORY_NAME FROM CATEGORY`;
    request.query(queryStr, function (err, recordset) {
       if(err)
       {
           console.log(error);
       }
       else
       {
           if (recordset.recordset.toString() == '')
           {
               console.log("Data for your request is empty");
           }
           res.send(recordset);
       }
   });
};

exports.getSubCategoryDetails = (req, res) =>
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT SUBCATEGORY_ID,SUBCATEGORY_CD,SUBCATEGORY_NAME FROM SUBCATEGORY`;
    request.query(queryStr, function (err, recordset) {
       if(err)
       {
           console.log(error);
       }
       else
       {
           if (recordset.recordset.toString() == '')
           {
               console.log("Data for your request is empty");
           }
           res.send(recordset);
       }
   });
};

exports.getProductList = (req, res) =>
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT PCODE,DESCRIPTION FROM vwProduct 
    WHERE COMP_CODE = '01' AND YEAR = '2023'`;
    request.query(queryStr, function (err, recordset) {
       if(err)
       {
           console.log(error);
       }
       else
       {
           if (recordset.recordset.toString() == '')
           {
               console.log("Data for your request is empty");
           }
           res.send(recordset);
       }
   });
};

exports.getProductListFromProductId = (req, res) =>
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT P.PCODE, P.DESCRIPTION, P.BARCODE, P.CATEGORY_ID, P.CATEGORY_NAME, P.SUBCATEGORY_ID, P.SUBCATEGORY_NAME, 
    P.MANUFACTURER_ID, P.MANUFACTURER_NAME, P.SUPPLIER_ID, P.SUPPLIER_NAME, P.COST_METHOD_DESC, P.FOB, P.REORDER, P.OPCOST, 
    P.COSTPRICE, P.RETAILPRICE, P.DISCOUNT, P.DEALERPRICE, P.LASTPURCHASEQTY, P.INVENTORY_ACC, P.COST_ACC, P.SALES_ACC, 
    P.CONTROLLED, P.STOCKITEM, P.EXPSALE, P.BONUS, P.VALID, P.SELLABLEITEM, P.PURCHASABLEITEM, P.SIZE_ID, P.SIZE, P.COLOR_ID, 
    P.COLOR, P.PROFILE_ID, P.PROFILE, P.VENDOR_ITEM_CODE, P.HEIGHT_M, P.WIDTH_M, P.VERSION, P.EXP_DESC, P.SEQUENCE, P.DESC1, 
    P.SALES_TAX_1_PERC, P.PURCHASE_TAX_1_PERC, P.SALES_TAX_CATEGORY_ID, P.PURCHASE_TAX_CATEGORY_ID,P.SHAREPERCENT,DESC2 FROM 
    vwProduct P WHERE P.PCODE='${req.params.pcode}' AND P.COMP_CODE='${req.params.compcode}' AND P.YEAR='${req.params.year}'`;
    request.query(queryStr, function (err, recordset) {
       if(err)
       {
           console.log(error);
       }
       else
       {
           if (recordset.recordset.toString() == '')
           {
               console.log("Data for your request is empty");
           }
           res.send(recordset);
       }
   });
};

