const mssql = require('mssql');

//MIS Report
exports.getMISReport = (req, res) =>
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT A.*   FROM ( SELECT O.PCODE, LTRIM(RTRIM(O.TITLE + ' ' + O.CUST_NAME)) CUST_NAME,
    O.GLCODE,O.GLNAME, G.SUBGRPCODE, SG.SUBGRPNAME,G.PL_BS,
    SG.MAINGRPCODE, O.STATUS, O.OPBAL+ISNULL((CASE WHEN CONVERT(DATE,'${req.params.fromDate}')>DATEADD(YEAR,-1,CONVERT(DATE,'${req.params.fromDate}')) THEN
    ( SELECT ISNULL(SUM(SO.GLDB_BAL-SO.GLCR_BAL),0) FROM SGLDATA_TEMP SO WHERE SO.COMP_CODE=O.COMP_CODE AND 
    SO.ACCODE=O.PCODE AND SO.VCR_DATE BETWEEN '${req.params.fromDate}' AND DATEADD(YEAR,-1,'${req.params.toDate}')) ELSE 0 END)  ,0) OPBAL, 
    ISNULL(S.GLDB_BAL,0) GLDB_BAL, ISNULL(S.GLCR_BAL,0) GLCR_BAL,CONVERT(DATE,'${req.params.fromDate}') REPORT_START_DATE, CONVERT(DATE,'${req.params.toDate}') REPORT_END_DATE 
    FROM vwOpbal O LEFT OUTER JOIN SGLDATA_TEMP S ON O.COMP_CODE=S.COMP_CODE AND O.PCODE=S.ACCODE AND S.VCR_DATE BETWEEN '${req.params.fromDate}' AND '${req.params.toDate}'
    LEFT OUTER JOIN GLCODE G ON O.COMP_CODE=G.COMP_CODE AND O.GLCODE=G.GLCODE LEFT OUTER JOIN SUBGROUP SG ON G.SUBGRPCODE=SG.SUBGRPCODE 
    LEFT OUTER JOIN MAINGROUP MG ON SG.MAINGRPCODE=MG.MAINGRPCODE  WHERE O.COMP_CODE='${req.params.strCompcode}' AND O.FYEAR='${req.params.strYear}' AND TYPE IN ('G','C','S')      ) A
    WHERE NOT ( ISNULL(A.OPBAL,0) = 0 AND ISNULL(A.GLDB_BAL,0) = 0 AND ISNULL(A.GLCR_BAL,0) = 0 ) ORDER BY A.MAINGRPCODE, A.SUBGRPCODE, A.GLCODE, A.PCODE`;
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

//BalanceSheet Report
exports.getBalanceSheetReport = (req, res) =>
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT '${req.params.prvfromDate}' PREV_PERIOD_START, '${req.params.prvToDate}' PREV_PERIOD_END,'${req.params.fromDate}' CURR_PERIOD_START,
    '${req.params.toDate}' CURR_PERIOD_END, O.GLCODE, G.GLNAME, G.SUBGRPCODE, SG.SUBGRPNAME, SG.MAINGRPCODE,
    MG.MAINGRPNAME, ISNULL(SUM(GLDB_BAL),0) DB_BAL, ISNULL(SUM(GLCR_BAL),0) CR_BAL, 
    ISNULL(SUM(CASE WHEN S.VCR_DATE BETWEEN '${req.params.prvfromDate}' AND '${req.params.prvToDate}' THEN GLDB_BAL ELSE 0 END),0) PREV_PERIOD_DB_BAL,
    ISNULL(SUM(CASE WHEN S.VCR_DATE BETWEEN '${req.params.prvfromDate}' AND '${req.params.prvToDate}' THEN GLCR_BAL ELSE 0 END),0) PREV_PERIOD_CR_BAL,
    ISNULL(SUM(CASE WHEN S.VCR_DATE BETWEEN '${req.params.fromDate}' AND '${req.params.toDate}' THEN GLDB_BAL ELSE 0 END),0) CURR_PERIOD_DB_BAL,
    ISNULL(SUM(CASE WHEN S.VCR_DATE BETWEEN '${req.params.fromDate}' AND '${req.params.toDate}' THEN GLCR_BAL ELSE 0 END),0) CURR_PERIOD_CR_BAL FROM OPBAL O 
    LEFT OUTER JOIN GLCODE G ON O.COMP_CODE=G.COMP_CODE AND O.GLCODE=G.GLCODE LEFT OUTER JOIN SUBGROUP SG ON G.SUBGRPCODE=SG.SUBGRPCODE 
    LEFT OUTER JOIN MAINGROUP MG ON SG.MAINGRPCODE=MG.MAINGRPCODE 
    LEFT OUTER JOIN SGLDATA_TEMP S ON O.COMP_CODE=S.COMP_CODE AND O.PCODE=S.ACCODE 
    AND ( S.VCR_DATE BETWEEN '${req.params.prvfromDate}' AND '${req.params.prvToDate}' OR S.VCR_DATE BETWEEN
    '${req.params.fromDate}' AND '${req.params.toDate}') WHERE O.COMP_CODE='${req.params.strCompcode}' AND O.FYEAR='${req.params.strYear}' AND O.TYPE IN ('G','C','S')
    GROUP BY O.GLCODE, G.GLNAME, G.SUBGRPCODE, SG.SUBGRPNAME, G.PL_BS, G.PL_BS_CODE, SG.MAINGRPCODE, MG.MAINGRPNAME`;
    console.log(queryStr);
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

//Trail Balance Summary
exports.getTrailBalanceSummary = (req, res) =>
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT A.*   FROM (SELECT O.PCODE, LTRIM(RTRIM(O.TITLE + ' ' + O.CUST_NAME)) CUST_NAME,
    O.GLCODE, O.GLNAME,O.OPBAL+ISNULL((CASE WHEN CONVERT(DATE,'${req.params.fromDate}')>CONVERT(DATE,'${req.params.fromDate}') 
    THEN(SELECT ISNULL(SUM(SO.GLDB_BAL-SO.GLCR_BAL),0) FROM SGLDATA_TEMP SO WHERE SO.COMP_CODE=O.COMP_CODE
    AND SO.ACCODE=O.PCODE AND SO.VCR_DATE BETWEEN DATEADD(YEAR,-1,'${req.params.fromDate}') AND DATEADD(DAY,-1,'${req.params.fromDate}')) ELSE 0 END) ,0) OPBAL,
    ISNULL(S.GLDB_BAL,0) GLDB_BAL, ISNULL(S.GLCR_BAL,0) GLCR_BAL,CONVERT(DATE,'${req.params.fromDate}') REPORT_START_DATE,
    CONVERT(DATE,'${req.params.toDate}') REPORT_END_DATE FROM vwOpbal O LEFT OUTER JOIN SGLDATA_TEMP S 
    ON O.COMP_CODE=S.COMP_CODE AND O.PCODE=S.ACCODE AND S.VCR_DATE BETWEEN '${req.params.fromDate}' AND '${req.params.toDate}' 
    LEFT OUTER JOIN GLCODE G ON O.COMP_CODE=G.COMP_CODE AND O.GLCODE=G.GLCODE 
    LEFT OUTER JOIN SUBGROUP SG ON G.SUBGRPCODE=SG.SUBGRPCODE 
    LEFT OUTER JOIN MAINGROUP MG ON SG.MAINGRPCODE=MG.MAINGRPCODE          
    WHERE O.COMP_CODE='${req.params.strCompCode}' AND O.FYEAR='${req.params.strYear}' AND TYPE IN ('G','C','S') ) 
    A WHERE NOT ( ISNULL(A.OPBAL,0) = 0 AND ISNULL(A.GLDB_BAL,0) = 0 AND ISNULL(A.GLCR_BAL,0) = 0 )  ORDER BY A.GLCODE`;
    console.log(queryStr);
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