const mssql = require('mssql');

exports.getAllUsers = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM ADUSERS`;
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

exports.getUser = (req, res) =>
{
     // Validate request
     console.log(`Fetching RESPONSE`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `SELECT USERCODE, PASSWORD, FIRSTNAME, LASTNAME, USERCLASS, CONTACTNO, EMPNO FROM ADUSERS WHERE USERCODE = '${req.params.username}';`;
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

exports.getUserLogin = (req, res) =>
{
     // Validate request
     console.log(`Fetching RESPONSE`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `select USERCODE,FIRSTNAME,LASTNAME  from adusers where USERCODE = '${req.params.usercode}'`;
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

exports.getUserRoles = (req, res) =>
{
     // Validate request
     console.log(`Fetching RESPONSE`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `SELECT * FROM ADMODULE_ACCESS_CONTROL WHERE ROLE_ID = '${req.params.userClass}';`;
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

exports.addNewUser = (req, res) =>
{
     // Validate request
     console.log(`INSERTING RECORD ${req.body}`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
    const queryStr = `INSERT INTO ADUSERS (USERCODE, PASSWORD, LANGUAGE, USERCLASS, FIRSTNAME, LASTNAME, CONTACTNO, USERID) VALUES ('${req.body.usercode}', '${req.body.password}', 'EN', '0', '${req.body.firstname}', '${req.body.lastname}', '${req.body.contactno}', ${req.body.userid});`;
     //const queryStr = `INSERT INTO ADUSERS (USERCODE, PASSWORD, LANGUAGE, USERCLASS, FIRSTNAME, LASTNAME, CONTACTNO, USERID) VALUES ('${req.body.usercode}', '${req.body.password}', '${req.body.language}', '${req.body.userclass}', '${req.body.firstname}', '${req.body.lastname}', '${req.body.contactno}', ${req.body.userid});`;
     console.log(queryStr);
     console.log(queryStr);
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
            res.send(recordset);
         };
    });
};

exports.updateUser = (req, res) => {
    // Validate request
    console.log(`Updating User Record ${req.body}`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `UPDATE ADUSERS SET PASSWORD = '${req.body.password}', FIRSTNAME = '${req.body.firstName}', LASTNAME = '${req.body.lastname}', CONTACTNO = '${req.body.contactno}'
     WHERE MemberNo = '${req.body.memberNo}';`;
     console.log(queryStr);
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
           res.send(recordset);
        };
   });
}

exports.updateUserPassword = (req, res) =>
{
     // Validate request
     console.log(`INSERTING RECORD ${req.body}`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `UPDATE ADUSERS SET PASSWORD = '${req.body.password}' WHERE USERCODE = '${req.body.usercode}';`;
     console.log(queryStr);
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
            res.send(recordset);
         };
    });
};

exports.getBatchSerial = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records


    const queryStr = `SELECT PCODE, NAME FROM REFERENCE WHERE COMP_CODE='01' AND TYPE='BTCHSRL' ORDER BY NAME`;

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


exports.getAllIncomeandExpenseDetails = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records


    const queryStr = `SELECT A.DB_CD, A.TRN_NO, A.TRN_DATE, A.TYPE, A.TRANS_TYPE, A.RECEIPT_TYPE, A.AMOUNT, CASE WHEN A.TYPE='EXPENSES' THEN A.AMOUNT*(-1) ELSE A.AMOUNT END VALUE, 
    A.CREATEDT, A.REMARKS, A.CUST_NAME, A.SUBJECT, CONVERT(DATE,'${req.params.startdate}') REPORT_START_DATE, CONVERT(DATE,'${req.params.enddate}') REPORT_END_DATE FROM (        		
    SELECT S.COMP_CODE, S.DB_CD, S.TRN_NO, S.TRN_DATE, CASE WHEN S.DB_CD='SRN' THEN 'SALES RETURNS' ELSE 'COLLECTIONS' END TYPE, 'CASH' TRANS_TYPE, 'CASH' RECEIPT_TYPE,
    S.CUST_NAME, S.SUBJECT,  		CASE WHEN S.DB_CD='SRN' THEN (S.CASH_AMT-S.CHANGE_AMT)*(-1) ELSE S.CASH_AMT-S.CHANGE_AMT END AMOUNT,  		
    ISNULL(S.REMARKS,'') REMARKS, S.CREATEDT FROM SALES S WHERE S.COMP_CODE='01' AND S.DB_CD IN ('POS','SRN')  		AND S.CASH_AMT-S.CHANGE_AMT<>0 AND 
    S.TRN_DATE BETWEEN  '${req.params.startdate}' AND '${req.params.enddate}'   AND S.BATCH_SERIAL='BSRL-BNYS'            
    UNION ALL SELECT S.COMP_CODE, S.DB_CD, S.TRN_NO, S.TRN_DATE, CASE WHEN S.DB_CD='SRN' THEN 'SALES RETURNS' ELSE 'COLLECTIONS' END TYPE, 'RETURN' TRANS_TYPE,
    'RETURN' RECEIPT_TYPE, S.CUST_NAME, S.SUBJECT,  		CASE WHEN S.DB_CD='SRN' THEN (S.RETURN_AMT)*(-1) ELSE S.RETURN_AMT END AMOUNT,  		
    ISNULL(S.REMARKS,'') REMARKS, S.CREATEDT FROM SALES S WHERE S.COMP_CODE='01' AND S.DB_CD IN ('POS','SRN')  		AND S.RETURN_AMT<>0 AND 
    S.TRN_DATE BETWEEN  '${req.params.startdate}' AND '${req.params.enddate}'   AND S.BATCH_SERIAL='BSRL-BNYS'             
    UNION ALL SELECT S.COMP_CODE, S.DB_CD, S.TRN_NO, S.TRN_DATE, CASE WHEN S.DB_CD='SRN' THEN 'SALES RETURNS' ELSE 'COLLECTIONS' END TYPE, 
    'CHEQUE' TRANS_TYPE, 'CHEQUE' RECEIPT_TYPE, S.CUST_NAME, S.SUBJECT,  		CASE WHEN S.DB_CD='SRN' THEN S.CHEQUE_AMT*(-1) ELSE S.CHEQUE_AMT END AMOUNT,
    ISNULL(S.REMARKS,'') REMARKS, S.CREATEDT FROM SALES S WHERE S.COMP_CODE='01' AND S.DB_CD IN ('POS','SRN')  		AND S.CHEQUE_AMT<>0 AND 
    S.TRN_DATE BETWEEN  '${req.params.startdate}' AND '${req.params.enddate}'   AND S.BATCH_SERIAL='BSRL-BNYS'             
    UNION ALL SELECT S.COMP_CODE, S.DB_CD, S.TRN_NO, S.TRN_DATE, CASE WHEN S.DB_CD='SRN' THEN 'SALES RETURNS' ELSE 'COLLECTIONS' END TYPE, 
    ISNULL(CREDIT_CARD_TYPE,'CREDIT CARD') TRANS_TYPE, ISNULL(CREDIT_CARD_TYPE,'CREDIT CARD') RECEIPT_TYPE, S.CUST_NAME, S.SUBJECT, 	    	
    CASE WHEN S.DB_CD='SRN' THEN S.CREDIT_CARD_AMT*(-1) ELSE S.CREDIT_CARD_AMT END AMOUNT, 		    CASE WHEN ISNULL(CREDIT_CARD_DISPLAY_NAME,'')<>'' THEN 
    ISNULL(CREDIT_CARD_DISPLAY_NAME,'') + ' / ' + ISNULL(CREDIT_CARD_NO,'') ELSE ISNULL(CREDIT_CARD_NO,'') END REMARKS, S.CREATEDT  		FROM SALES S WHERE 
    S.COMP_CODE='01' AND S.DB_CD IN ('POS','SRN')  		AND S.CREDIT_CARD_AMT<>0 AND S.TRN_DATE BETWEEN  '${req.params.startdate}' AND '${req.params.enddate}'   AND S.BATCH_SERIAL='BSRL-BNYS' 
    UNION ALL  		SELECT S.COMP_CODE, S.DB_CD, S.VCR_NO, S.VCR_DATE, CASE WHEN S.DB_CD='SRN' THEN 'SALES RETURNS' ELSE 'COLLECTIONS' END TYPE, 'RECEIPTS' TRANS_TYPE,
    CASE WHEN T.CREDIT_CARD_AMT>0 THEN ISNULL(T.CREDIT_CARD_TYPE,'CREDIT CARD') WHEN CHEQUE_AMT>0 THEN 'CHEQUE' ELSE 'CASH' END RECEIPT_TYPE,  		
    T.LNAME CUST_NAME, T.NARRATION SUBJECT, ISNULL(S.AMOUNT,0) AMOUNT, ISNULL(S.REMARKS,'') REMARKS, T.CREATEDT  		FROM SGLDATA_TEMP S 
    JOIN TRAN_HEAD T ON S.COMP_CODE=T.COMP_CODE AND S.YEAR=T.YEAR AND S.DB_CD=T.DB_CD AND S.TRN_TYPE=T.TRN_TYPE AND S.VCR_NO=T.TRN_NO  		
    WHERE S.COMP_CODE='01' AND S.TRN_TYPE='REC' AND S.DB_CD<>'POS' AND S.ENTRY_TP='D' AND S.VCR_DATE BETWEEN  '${req.params.startdate}' AND '${req.params.enddate}'  AND T.BATCH_SERIAL='BSRL-BNYS' 
    UNION ALL  SELECT S.COMP_CODE, S.DB_CD, S.TRN_NO, S.TRN_DATE, CASE WHEN S.DB_CD='SRN' THEN 'SALES RETURNS' ELSE 'COLLECTIONS' END TYPE, 'CREDIT SALES' TRANS_TYPE,
    '' RECEIPT_TYPE, S.CUST_NAME, S.SUBJECT, 0 AMOUNT, ISNULL(S.REMARKS,'') REMARKS, S.CREATEDT  		
    FROM SALES S WHERE S.COMP_CODE='01' AND S.DB_CD IN ('INV','SRN') AND (S.CASH_AMT+S.CHEQUE_AMT+S.CREDIT_CARD_AMT)=0 AND S.CREDIT_AMT<>0  		
    AND S.TRN_DATE BETWEEN  '${req.params.startdate}' AND '${req.params.enddate}'  AND S.BATCH_SERIAL='BSRL-BNYS' 			
    UNION ALL  		SELECT S.COMP_CODE, '' DB_CD, S.VCR_NO TRN_NO, S.VCR_DATE, 'EXPENSES' TYPE, 'DAILY EXPENSES' TRANS_TYPE,         
    (SELECT MAX(P.PMTNAME) FROM SGLDATA_TEMP S2 JOIN (SELECT MAX(P.PMTNAME) PMTNAME, P.PCODE FROM PMTTYPE P GROUP BY P.PCODE) P ON P.PCODE=S2.ACCODE WHERE
    S2.COMP_CODE=S.COMP_CODE AND S2.YEAR=S.YEAR AND S2.DB_CD=S.DB_CD AND S2.VCR_NO=S.VCR_NO AND S2.ENTRY_TP='C') RECEIPT_TYPE,         
    '' CUST_NAME, T.NARRATION SUBJECT, ISNULL(S.AMOUNT,0) AMOUNT,  		ISNULL((SELECT O.CUST_NAME FROM vwOPBAL O WHERE O.COMP_CODE=S.COMP_CODE AND O.FYEAR=S.YEAR 
    AND O.PCODE=S.ACCODE)+CASE WHEN ISNULL(S.REMARKS,'')<>'' THEN ' - ' + S.REMARKS ELSE '' END,'') REMARKS, T.CREATEDT  		FROM SGLDATA_TEMP S JOIN TRAN_HEAD T
    ON S.COMP_CODE=T.COMP_CODE AND S.YEAR=T.YEAR AND S.DB_CD=T.DB_CD AND S.TRN_TYPE=T.TRN_TYPE AND S.VCR_NO=T.TRN_NO  		WHERE S.COMP_CODE='01' AND S.TRN_TYPE='JUR' 
    AND S.ENTRY_TP='D' AND S.VCR_DATE BETWEEN  '${req.params.startdate}' AND '${req.params.enddate}'   AND T.BATCH_SERIAL='BSRL-BNYS' 		
    AND S.DB_CD+S.VCR_NO IN (SELECT S2.DB_CD+S2.VCR_NO FROM SGLDATA_TEMP S2 WHERE S2.COMP_CODE=S.COMP_CODE AND S2.YEAR=S.YEAR AND S2.TRN_TYPE=S.TRN_TYPE AND 
    S2.ENTRY_TP='C' AND S2.ACCODE IN (SELECT P.PCODE FROM PMTTYPE P))          AND (S.JOURNAL_TYPE_ID IS NULL OR NOT S.JOURNAL_TYPE_ID IN (SELECT JT.TYPE_ID 
    FROM JOURNAL_ENTRY_TYPE JT WHERE JT.ACTIVE=1 )) 	 ) A`;


    

    console.log(queryStr);

    request.query(queryStr, function (err, recordset) {
        if(err)
        {
            console.log(err);
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

exports.getBatchIncomeandExpenseDetails = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records


    const queryStr = `SELECT A.DB_CD, A.TRN_NO, A.TRN_DATE, A.TYPE, A.TRANS_TYPE, A.RECEIPT_TYPE, A.AMOUNT, CASE WHEN A.TYPE='EXPENSES' THEN A.AMOUNT*(-1) ELSE A.AMOUNT END VALUE, 
    A.CREATEDT, A.REMARKS, A.CUST_NAME, A.SUBJECT, CONVERT(DATE,'${req.params.startdate}') REPORT_START_DATE, CONVERT(DATE,'${req.params.enddate}') REPORT_END_DATE FROM (        		
    SELECT S.COMP_CODE, S.DB_CD, S.TRN_NO, S.TRN_DATE, CASE WHEN S.DB_CD='SRN' THEN 'SALES RETURNS' ELSE 'COLLECTIONS' END TYPE, 'CASH' TRANS_TYPE, 'CASH' RECEIPT_TYPE,
    S.CUST_NAME, S.SUBJECT,  		CASE WHEN S.DB_CD='SRN' THEN (S.CASH_AMT-S.CHANGE_AMT)*(-1) ELSE S.CASH_AMT-S.CHANGE_AMT END AMOUNT,  		
    ISNULL(S.REMARKS,'') REMARKS, S.CREATEDT FROM SALES S WHERE S.COMP_CODE='01' AND S.DB_CD IN ('POS','SRN')  		AND S.CASH_AMT-S.CHANGE_AMT<>0 AND 
    S.TRN_DATE BETWEEN  '${req.params.startdate}' AND '${req.params.enddate}'   AND S.BATCH_SERIAL='BSRL-BNYS'            
    UNION ALL SELECT S.COMP_CODE, S.DB_CD, S.TRN_NO, S.TRN_DATE, CASE WHEN S.DB_CD='SRN' THEN 'SALES RETURNS' ELSE 'COLLECTIONS' END TYPE, 'RETURN' TRANS_TYPE,
    'RETURN' RECEIPT_TYPE, S.CUST_NAME, S.SUBJECT,  		CASE WHEN S.DB_CD='SRN' THEN (S.RETURN_AMT)*(-1) ELSE S.RETURN_AMT END AMOUNT,  		
    ISNULL(S.REMARKS,'') REMARKS, S.CREATEDT FROM SALES S WHERE S.COMP_CODE='01' AND S.DB_CD IN ('POS','SRN')  		AND S.RETURN_AMT<>0 AND 
    S.TRN_DATE BETWEEN  '${req.params.startdate}' AND '${req.params.enddate}'   AND S.BATCH_SERIAL='BSRL-BNYS'             
    UNION ALL SELECT S.COMP_CODE, S.DB_CD, S.TRN_NO, S.TRN_DATE, CASE WHEN S.DB_CD='SRN' THEN 'SALES RETURNS' ELSE 'COLLECTIONS' END TYPE, 
    'CHEQUE' TRANS_TYPE, 'CHEQUE' RECEIPT_TYPE, S.CUST_NAME, S.SUBJECT,  		CASE WHEN S.DB_CD='SRN' THEN S.CHEQUE_AMT*(-1) ELSE S.CHEQUE_AMT END AMOUNT,
    ISNULL(S.REMARKS,'') REMARKS, S.CREATEDT FROM SALES S WHERE S.COMP_CODE='01' AND S.DB_CD IN ('POS','SRN')  		AND S.CHEQUE_AMT<>0 AND 
    S.TRN_DATE BETWEEN  '${req.params.startdate}' AND '${req.params.enddate}'   AND S.BATCH_SERIAL='BSRL-BNYS'             
    UNION ALL SELECT S.COMP_CODE, S.DB_CD, S.TRN_NO, S.TRN_DATE, CASE WHEN S.DB_CD='SRN' THEN 'SALES RETURNS' ELSE 'COLLECTIONS' END TYPE, 
    ISNULL(CREDIT_CARD_TYPE,'CREDIT CARD') TRANS_TYPE, ISNULL(CREDIT_CARD_TYPE,'CREDIT CARD') RECEIPT_TYPE, S.CUST_NAME, S.SUBJECT, 	    	
    CASE WHEN S.DB_CD='SRN' THEN S.CREDIT_CARD_AMT*(-1) ELSE S.CREDIT_CARD_AMT END AMOUNT, 		    CASE WHEN ISNULL(CREDIT_CARD_DISPLAY_NAME,'')<>'' THEN 
    ISNULL(CREDIT_CARD_DISPLAY_NAME,'') + ' / ' + ISNULL(CREDIT_CARD_NO,'') ELSE ISNULL(CREDIT_CARD_NO,'') END REMARKS, S.CREATEDT  		FROM SALES S WHERE 
    S.COMP_CODE='01' AND S.DB_CD IN ('POS','SRN')  		AND S.CREDIT_CARD_AMT<>0 AND S.TRN_DATE BETWEEN  '${req.params.startdate}' AND '${req.params.enddate}'   AND S.BATCH_SERIAL='BSRL-BNYS' 
    UNION ALL  		SELECT S.COMP_CODE, S.DB_CD, S.VCR_NO, S.VCR_DATE, CASE WHEN S.DB_CD='SRN' THEN 'SALES RETURNS' ELSE 'COLLECTIONS' END TYPE, 'RECEIPTS' TRANS_TYPE,
    CASE WHEN T.CREDIT_CARD_AMT>0 THEN ISNULL(T.CREDIT_CARD_TYPE,'CREDIT CARD') WHEN CHEQUE_AMT>0 THEN 'CHEQUE' ELSE 'CASH' END RECEIPT_TYPE,  		
    T.LNAME CUST_NAME, T.NARRATION SUBJECT, ISNULL(S.AMOUNT,0) AMOUNT, ISNULL(S.REMARKS,'') REMARKS, T.CREATEDT  		FROM SGLDATA_TEMP S 
    JOIN TRAN_HEAD T ON S.COMP_CODE=T.COMP_CODE AND S.YEAR=T.YEAR AND S.DB_CD=T.DB_CD AND S.TRN_TYPE=T.TRN_TYPE AND S.VCR_NO=T.TRN_NO  		
    WHERE S.COMP_CODE='01' AND S.TRN_TYPE='REC' AND S.DB_CD<>'POS' AND S.ENTRY_TP='D' AND S.VCR_DATE BETWEEN  '${req.params.startdate}' AND '${req.params.enddate}'  AND T.BATCH_SERIAL='BSRL-BNYS' 
    UNION ALL  SELECT S.COMP_CODE, S.DB_CD, S.TRN_NO, S.TRN_DATE, CASE WHEN S.DB_CD='SRN' THEN 'SALES RETURNS' ELSE 'COLLECTIONS' END TYPE, 'CREDIT SALES' TRANS_TYPE,
    '' RECEIPT_TYPE, S.CUST_NAME, S.SUBJECT, 0 AMOUNT, ISNULL(S.REMARKS,'') REMARKS, S.CREATEDT  		
    FROM SALES S WHERE S.COMP_CODE='01' AND S.DB_CD IN ('INV','SRN') AND (S.CASH_AMT+S.CHEQUE_AMT+S.CREDIT_CARD_AMT)=0 AND S.CREDIT_AMT<>0  		
    AND S.TRN_DATE BETWEEN  '${req.params.startdate}' AND '${req.params.enddate}'  AND S.BATCH_SERIAL='BSRL-BNYS' 			
    UNION ALL  		SELECT S.COMP_CODE, '' DB_CD, S.VCR_NO TRN_NO, S.VCR_DATE, 'EXPENSES' TYPE, 'DAILY EXPENSES' TRANS_TYPE,         
    (SELECT MAX(P.PMTNAME) FROM SGLDATA_TEMP S2 JOIN (SELECT MAX(P.PMTNAME) PMTNAME, P.PCODE FROM PMTTYPE P GROUP BY P.PCODE) P ON P.PCODE=S2.ACCODE WHERE
    S2.COMP_CODE=S.COMP_CODE AND S2.YEAR=S.YEAR AND S2.DB_CD=S.DB_CD AND S2.VCR_NO=S.VCR_NO AND S2.ENTRY_TP='C') RECEIPT_TYPE,         
    '' CUST_NAME, T.NARRATION SUBJECT, ISNULL(S.AMOUNT,0) AMOUNT,  		ISNULL((SELECT O.CUST_NAME FROM vwOPBAL O WHERE O.COMP_CODE=S.COMP_CODE AND O.FYEAR=S.YEAR 
    AND O.PCODE=S.ACCODE)+CASE WHEN ISNULL(S.REMARKS,'')<>'' THEN ' - ' + S.REMARKS ELSE '' END,'') REMARKS, T.CREATEDT  		FROM SGLDATA_TEMP S JOIN TRAN_HEAD T
    ON S.COMP_CODE=T.COMP_CODE AND S.YEAR=T.YEAR AND S.DB_CD=T.DB_CD AND S.TRN_TYPE=T.TRN_TYPE AND S.VCR_NO=T.TRN_NO  		WHERE S.COMP_CODE='01' AND S.TRN_TYPE='JUR' 
    AND S.ENTRY_TP='D' AND S.VCR_DATE BETWEEN  '${req.params.startdate}' AND '${req.params.enddate}'   AND T.BATCH_SERIAL='BSRL-BNYS' 		
    AND S.DB_CD+S.VCR_NO IN (SELECT S2.DB_CD+S2.VCR_NO FROM SGLDATA_TEMP S2 WHERE S2.COMP_CODE=S.COMP_CODE AND S2.YEAR=S.YEAR AND S2.TRN_TYPE=S.TRN_TYPE AND 
    S2.ENTRY_TP='C' AND S2.ACCODE IN (SELECT P.PCODE FROM PMTTYPE P))          AND (S.JOURNAL_TYPE_ID IS NULL OR NOT S.JOURNAL_TYPE_ID IN (SELECT JT.TYPE_ID 
    FROM JOURNAL_ENTRY_TYPE JT WHERE JT.ACTIVE=1 )) 	 ) A`;

    console.log(queryStr);

    request.query(queryStr, function (err, recordset) {
        if(err)
        {
            console.log(err);
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


exports.getStockSummaryReport = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records


    const queryStr = `SELECT A.PRODUCT_ID,A.DESCRIPTION, A.OP_QTY, A.OP_COST, A.OP_QTY*A.OP_COST NET_OP_VALUE, 
    A.PURCH_QTY, A.PURCH_VALUE, A.MOVEMENT_QTY, A.MOVEMENT_VALUE, 
    ISNULL(A.AVG_COST,A.OP_COST) AVG_COST, (A.OP_QTY+A.PURCH_QTY-A.MOVEMENT_QTY) CURR_QTY,
    (A.OP_QTY+A.PURCH_QTY-A.MOVEMENT_QTY)*ISNULL(A.AVG_COST,A.OP_COST) NET_CURR_VALUE
    FROM (                    SELECT PL.PRODUCT_ID,
    BARCODE, ISNULL(P.DESCRIPTION,'') DESCRIPTION,            P.CATEGORY_NAME, P.SUBCATEGORY_NAME, 
    P.MANUFACTURER_NAME, P.SUPPLIER_NAME, P.OPCOST BASE_UNIT_OP_COST, P.COSTPRICE BASE_UNIT_COSTPRICE,            
    P.RETAILPRICE BASE_UNIT_RETAILPRICE, P.DEALERPRICE BASE_UNIT_DEALERPRICE, P.BASE_UNIT_DESCRIPTION, 
    P.PROFILE_ID, P.PROFILE,            P.WEIGHT, P.UOW_CD, P.UOW, P.HEIGHT, P.WIDTH, P.HEIGHT_M, P.WIDTH_M, 
    P.LENGTH, P.UOM_CD, P.UOM, P.SIZE_CD, P.SIZE, P.SIZE_VALUE,            P.COLOR_CD, P.COLOR, P.VENDOR_ITEM_CODE,
    P.VERSION, P.EXP_CODE, P.EXP_DESC, P.SEQUENCE, P.REORDER,            SUM(PL.OPENING_QTY) + 
    ISNULL((SELECT SUM(S.TOTALQUANTITY*UI.QTY_PER_BASE_UNIT) FROM STOCKTR S LEFT OUTER JOIN UNITPERITEM UI ON 
    UI.UNIT_CODE=S.UNIT_CODE AND UI.PCODE=S.PCODE AND UI.COMP_CODE=S.COMP_CODE WHERE S.COMP_CODE=PL.COMP_CODE AND 
    S.YEAR=PL.YEAR AND S.PCODE=PL.PRODUCT_ID  AND S.TRN_DATE<'${req.params.startdate}' AND S.TYPE='R'),0) OP_QTY,            
    ISNULL((SELECT MAX(S.UNITCOSTPRICE) FROM STOCKTR S WHERE S.COMP_CODE=PL.COMP_CODE AND S.YEAR=PL.YEAR AND 
    S.PCODE=PL.PRODUCT_ID AND S.TRN_DATE=(SELECT MAX(S2.TRN_DATE) FROM STOCKTR S2 WHERE S2.COMP_CODE=S.COMP_CODE 
    AND S2.YEAR=S.YEAR AND S2.PCODE=S.PCODE AND S2.TYPE=S.TYPE AND S2.TRN_DATE<'${req.params.startdate}') AND S.TYPE='R'),
    P.OPCOST) OP_COST,            ISNULL((SELECT SUM(S.TOTALQUANTITY*UI.QTY_PER_BASE_UNIT) FROM STOCKTR S 
    LEFT OUTER JOIN UNITPERITEM UI ON UI.UNIT_CODE=S.UNIT_CODE AND UI.PCODE=S.PCODE AND UI.COMP_CODE=S.COMP_CODE 
    WHERE S.COMP_CODE=PL.COMP_CODE AND S.YEAR=PL.YEAR AND S.PCODE=PL.PRODUCT_ID  AND S.TRN_DATE BETWEEN 
    '${req.params.startdate}' AND '${req.params.enddate}' AND S.TYPE='R' AND (S.DB_CD IN ('GRN','PRN') OR (S.DB_CD='ADJ' AND 
    S.TOTALQUANTITY>0))),0) PURCH_QTY,            ISNULL((SELECT SUM(S.TOTALQUANTITY*UI.QTY_PER_BASE_UNIT*
    S.LANDED_COST) FROM STOCKTR S LEFT OUTER JOIN UNITPERITEM UI ON UI.UNIT_CODE=S.UNIT_CODE AND UI.PCODE=S.PCODE 
    AND UI.COMP_CODE=S.COMP_CODE WHERE S.COMP_CODE=PL.COMP_CODE AND S.YEAR=PL.YEAR AND S.PCODE=PL.PRODUCT_ID  AND 
    S.TRN_DATE BETWEEN '${req.params.startdate}' AND '${req.params.enddate}' AND S.TYPE='R' AND (S.DB_CD IN ('GRN','PRN') OR 
    (S.DB_CD='ADJ' AND S.TOTALQUANTITY>0))),0) PURCH_VALUE,            ISNULL((SELECT SUM(S.TOTALQUANTITY*
    UI.QTY_PER_BASE_UNIT) FROM STOCKTR S LEFT OUTER JOIN UNITPERITEM UI ON UI.UNIT_CODE=S.UNIT_CODE AND 
    UI.PCODE=S.PCODE AND UI.COMP_CODE=S.COMP_CODE WHERE S.COMP_CODE=PL.COMP_CODE AND S.YEAR=PL.YEAR AND 
    S.PCODE=PL.PRODUCT_ID  AND S.TRN_DATE BETWEEN '${req.params.startdate}' AND '${req.params.enddate}' AND S.TYPE='R' AND NOT 
    (S.DB_CD IN ('GRN','PRN') OR (S.DB_CD='ADJ' AND S.TOTALQUANTITY>0))),0)*(-1) MOVEMENT_QTY,            
    ISNULL((SELECT SUM(S.TOTALQUANTITY*UI.QTY_PER_BASE_UNIT*S.UNITCOSTPRICE) FROM STOCKTR S LEFT OUTER JOIN 
    UNITPERITEM UI ON UI.UNIT_CODE=S.UNIT_CODE AND UI.PCODE=S.PCODE AND UI.COMP_CODE=S.COMP_CODE WHERE 
    S.COMP_CODE=PL.COMP_CODE AND S.YEAR=PL.YEAR AND S.PCODE=PL.PRODUCT_ID  AND S.TRN_DATE BETWEEN '${req.params.startdate}' 
    AND '${req.params.enddate}' AND S.TYPE='R' AND NOT (S.DB_CD IN ('GRN','PRN') OR (S.DB_CD='ADJ' AND 
    S.TOTALQUANTITY>0))),0)*(-1) MOVEMENT_VALUE,            (SELECT MAX(S.UNITCOSTPRICE) FROM STOCKTR S WHERE 
    S.COMP_CODE=PL.COMP_CODE AND S.YEAR=PL.YEAR AND S.PCODE=PL.PRODUCT_ID AND S.TRN_DATE=(SELECT MAX(S2.TRN_DATE) 
    FROM STOCKTR S2 WHERE S2.COMP_CODE=S.COMP_CODE AND S2.YEAR=S.YEAR AND S2.PCODE=S.PCODE AND S2.TYPE=S.TYPE AND 
    S2.TRN_DATE BETWEEN '${req.params.startdate}' AND '${req.params.enddate}') AND S.TYPE='R') AVG_COST,            
    (SELECT TOP 1 TRN_DATE FROM STOCKTR S WHERE S.COMP_CODE=PL.COMP_CODE AND S.DB_CD IN ('POS','INV') AND 
    S.PCODE=PL.PRODUCT_ID AND S.TYPE='R' AND S.TRN_DATE<='${req.params.enddate}' ORDER BY S.TRN_DATE DESC) LAST_SOLD_ON,
    (SELECT TOP 1 TRN_DATE FROM STOCKTR S WHERE S.COMP_CODE=PL.COMP_CODE AND S.DB_CD IN ('GRN') AND 
    S.PCODE=PL.PRODUCT_ID AND S.TYPE='R' AND S.TRN_DATE<='${req.params.enddate}' ORDER BY S.TRN_DATE DESC) LAST_GRN_DATE,
    (SELECT TOP 1 LANDED_COST FROM STOCKTR S WHERE S.COMP_CODE=PL.COMP_CODE AND S.DB_CD IN ('GRN') AND 
    S.PCODE=PL.PRODUCT_ID AND S.TYPE='R' AND S.TRN_DATE<='${req.params.enddate}' ORDER BY S.TRN_DATE DESC) LAST_GRN_COST,
    (SELECT TOP 1 LANDED_COST FROM STOCKTR S WHERE S.COMP_CODE=PL.COMP_CODE AND S.DB_CD IN ('GRN') AND 
    S.PCODE=PL.PRODUCT_ID AND S.TYPE='R' AND S.TRN_DATE<'${req.params.startdate}' ORDER BY S.TRN_DATE DESC) 
    LAST_GRN_COST_PREV_YEAR            FROM PRODUCT_LOCATION_RELATION PL LEFT OUTER JOIN vwProduct P           
    ON PL.COMP_CODE = P.COMP_CODE AND PL.YEAR = P.YEAR AND PL.PRODUCT_ID = P.PCODE            
    WHERE PL.COMP_CODE='${req.params.compcode}' AND PL.YEAR='${req.params.stryear}'            GROUP BY PL.COMP_CODE, PL.YEAR, PL.PRODUCT_ID, 
    P.BARCODE, P.DESCRIPTION,             P.CATEGORY_NAME, P.SUBCATEGORY_NAME, P.MANUFACTURER_NAME, 
    P.SUPPLIER_NAME, P.OPCOST, P.COSTPRICE,            P.RETAILPRICE, P.DEALERPRICE, P.BASE_UNIT_DESCRIPTION,
    P.PROFILE_ID, P.PROFILE,            P.WEIGHT, P.UOW_CD, P.UOW, P.HEIGHT, P.WIDTH, P.HEIGHT_M, P.WIDTH_M, 
    P.LENGTH, P.UOM_CD, P.UOM, P.SIZE_CD, P.SIZE, P.SIZE_VALUE,            P.COLOR_CD, P.COLOR, 
    P.VENDOR_ITEM_CODE, P.VERSION, P.EXP_CODE, P.EXP_DESC, P.SEQUENCE, P.REORDER      ) A `;

    console.log(queryStr);

    request.query(queryStr, function (err, recordset) {
        if(err)
        {
            console.log(err);
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

exports.getSalesAndProfitByCustomer = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records

    const queryStr = `SELECT SM.TRN_NO, SM.TRN_DATE, SM.TRN_NO INV_NO,    
    SM.CURR_RATE,ST.PCODE LINE_PCODE, ST.DESCRIPTION LINE_DESCRIPTION,U.UNIT_DESCRIPTION LINE_UNIT_DESCRIPTION, 
    ISNULL(ST.TOTALQUANTITY,0)*(-1) LINE_QTY, 
    ST.NETAMOUNT*(CASE WHEN ST.DB_CD='SRN' THEN -1 ELSE 1 END) LINE_NET_AMT,
    ST.UNITCOSTPRICE, UI.QTY_PER_BASE_UNIT,CASE WHEN ST.NETAMOUNT>0 AND SM.DISCOUNT>0 AND 
    SM.GROSSAMOUNT>0 THEN CONVERT(NUMERIC(18,8),  (ST.NETAMOUNT*SM.DISCOUNT)/SM.GROSSAMOUNT  ) * (CASE WHEN ST.DB_CD='SRN' THEN -1 ELSE 1 END) ELSE 0 END LINE_DISCOUNT_FROM_HEADER
    FROM STOCKTR ST JOIN vwSalesTransactions SM ON ST.COMP_CODE=SM.COMP_CODE AND 
    ST.TRN_NO=SM.TRN_NO LEFT OUTER JOIN vwProduct P ON ST.COMP_CODE=P.COMP_CODE AND ST.YEAR=P.YEAR AND ST.PCODE=P.PCODE
    LEFT OUTER JOIN UNIT U ON ST.UNIT_CODE=U.UNIT_CODE LEFT OUTER JOIN UNITPERITEM UI ON UI.COMP_CODE=ST.COMP_CODE AND
    UI.PCODE=ST.PCODE AND UI.UNIT_CODE=ST.UNIT_CODE LEFT OUTER JOIN LOCATION L ON ST.COMP_CODE=L.COMP_CODE AND 
    ST.LOCATIONID=L.LOCATIONID LEFT OUTER JOIN vwSOMaster SO ON SM.COMP_CODE=SO.COMP_CODE AND SM.SONO=SO.SONO WHERE 
    ST.DB_CD IN ('INV','POS','SRN')  AND ST.COMP_CODE='01' AND SM.TRN_DATE BETWEEN '${req.params.startdate}' AND '${req.params.enddate}'  
    UNION ALL SELECT TH.TRN_NO, TH.TRN_DATE, TH.INV_NO,TH.CURR_RATE,ST.PCODE LINE_PCODE, ST.DESCRIPTION 
    LINE_DESCRIPTION,U.UNIT_DESCRIPTION LINE_UNIT_DESCRIPTION, ISNULL(ST.TOTALQUANTITY,0)*(-1) LINE_QTY,
    ST.NETAMOUNT LINE_NET_AMT,ST.UNITCOSTPRICE,UI.QTY_PER_BASE_UNIT, 0 LINE_DISCOUNT_FROM_HEADER FROM STOCKTR ST JOIN vwTranHead TH ON ST.COMP_CODE=TH.COMP_CODE AND ST.DB_CD=TH.DB_CD
    AND ST.TRN_NO=TH.TRN_NO LEFT OUTER JOIN vwProduct P ON ST.COMP_CODE=P.COMP_CODE AND ST.YEAR=P.YEAR AND ST.PCODE=P.PCODE
    LEFT OUTER JOIN UNIT U ON ST.UNIT_CODE=U.UNIT_CODE LEFT OUTER JOIN UNITPERITEM UI ON UI.COMP_CODE=ST.COMP_CODE AND
    UI.PCODE=ST.PCODE AND UI.UNIT_CODE=ST.UNIT_CODE LEFT OUTER JOIN LOCATION L ON ST.COMP_CODE=L.COMP_CODE AND 
    ST.LOCATIONID=L.LOCATIONID LEFT OUTER JOIN vwSOMaster SO ON TH.COMP_CODE=SO.COMP_CODE AND TH.REF_NO=SO.SONO WHERE 
    ST.DB_CD IN ('DNN')  AND ST.COMP_CODE='01' AND TH.TRN_DATE BETWEEN '${req.params.startdate}' AND '${req.params.enddate}' 
    UNION ALL SELECT TR.TRN_NO, TR.TRN_DATE,TH.INV_NO,TR.CURR_RATE,ST.PCODE LINE_PCODE, ST.DESCRIPTION LINE_DESCRIPTION,
    U.UNIT_DESCRIPTION LINE_UNIT_DESCRIPTION, ISNULL(ST.TOTALQUANTITY,0)*(-1) LINE_QTY, 
    ST.NETAMOUNT*(-1) LINE_NET_AMT,ST.UNITCOSTPRICE,UI.QTY_PER_BASE_UNIT, 0 LINE_DISCOUNT_FROM_HEADER FROM STOCKTR ST JOIN vwTranHead TR ON 
    ST.COMP_CODE=TR.COMP_CODE AND ST.DB_CD=TR.DB_CD AND ST.TRN_NO=TR.TRN_NO JOIN vwTranHead TH ON TH.COMP_CODE=TR.COMP_CODE 
    AND TH.DB_CD='DNN' AND TH.TRN_NO=TR.REF_NO LEFT OUTER JOIN vwProduct P ON ST.COMP_CODE=P.COMP_CODE AND ST.YEAR=P.YEAR AND
    ST.PCODE=P.PCODE LEFT OUTER JOIN UNIT U ON ST.UNIT_CODE=U.UNIT_CODE LEFT OUTER JOIN UNITPERITEM UI ON 
    UI.COMP_CODE=ST.COMP_CODE AND UI.PCODE=ST.PCODE AND UI.UNIT_CODE=ST.UNIT_CODE LEFT OUTER JOIN LOCATION L ON 
    ST.COMP_CODE=L.COMP_CODE AND ST.LOCATIONID=L.LOCATIONID LEFT OUTER JOIN vwSOMaster SO ON TH.COMP_CODE=SO.COMP_CODE 
    AND TH.REF_NO=SO.SONO WHERE ST.DB_CD IN ('DRN')  AND ST.COMP_CODE='01' AND TH.TRN_DATE BETWEEN '${req.params.startdate}' AND '${req.params.enddate}'         
    UNION ALL SELECT SM.TRN_NO, SM.TRN_DATE,SM.TRN_NO INV_NO, SM.CURR_RATE,ST.PCODE LINE_PCODE, ST.DESCRIPTION LINE_DESCRIPTION,  
    U.UNIT_DESCRIPTION LINE_UNIT_DESCRIPTION, 
    ISNULL(ST.TOTALQUANTITY,0) LINE_QTY,ST.NETAMOUNT*(CASE WHEN ST.DB_CD='SRN' THEN -1 ELSE 1 END) LINE_NET_AMT,
    ST.NETAMOUNT/(CASE WHEN ISNULL(ST.TOTALQUANTITY,0)>0 THEN ST.TOTALQUANTITY ELSE 1 END) UNITCOSTPRICE,
    1 QTY_PER_BASE_UNIT,CASE WHEN ST.NETAMOUNT>0 AND SM.DISCOUNT>0 AND
    SM.GROSSAMOUNT>0 THEN CONVERT(NUMERIC(18,8),  (ST.NETAMOUNT*SM.DISCOUNT)/SM.GROSSAMOUNT  ) * (CASE WHEN ST.DB_CD='SRN'
    THEN -1 ELSE 1 END) ELSE 0 END LINE_DISCOUNT_FROM_HEADER FROM TRAN_DETAILS ST JOIN vwSalesTransactions SM 
    ON ST.COMP_CODE=SM.COMP_CODE AND ST.TRN_NO=SM.TRN_NO LEFT OUTER JOIN LOCATION L ON ST.COMP_CODE=L.COMP_CODE AND 
    ST.LOCATIONID=L.LOCATIONID LEFT OUTER JOIN UNIT U ON ST.UNIT_CODE=U.UNIT_CODE LEFT OUTER JOIN vwSOMaster SO 
    ON SM.COMP_CODE=SO.COMP_CODE AND SM.SONO=SO.SONO WHERE ST.DB_CD IN ('INV','POS','SRN') AND ST.DI<>'I'  
    AND ST.COMP_CODE='01'  AND SM.TRN_DATE BETWEEN '${req.params.startdate}' AND '${req.params.enddate}'
    UNION ALL SELECT TH.TRN_NO, TH.TRN_DATE, TH.INV_NO,TH.CURR_RATE, ST.PCODE LINE_PCODE, 
    ST.DESCRIPTION LINE_DESCRIPTION, U.UNIT_DESCRIPTION LINE_UNIT_DESCRIPTION, ISNULL(ST.TOTALQUANTITY,0) LINE_QTY, 
    ST.NETAMOUNT LINE_NET_AMT, ST.NETAMOUNT/(CASE WHEN ISNULL(ST.TOTALQUANTITY,0)>0 THEN ST.TOTALQUANTITY ELSE 1 END) UNITCOSTPRICE,
    1 QTY_PER_BASE_UNIT,0 LINE_DISCOUNT_FROM_HEADER FROM TRAN_DETAILS ST JOIN vwTranHead TH ON ST.COMP_CODE=TH.COMP_CODE 
    AND ST.DB_CD=TH.DB_CD AND ST.TRN_NO=TH.TRN_NO LEFT OUTER JOIN LOCATION L ON ST.COMP_CODE=L.COMP_CODE AND
    ST.LOCATIONID=L.LOCATIONID LEFT OUTER JOIN UNIT U ON ST.UNIT_CODE=U.UNIT_CODE LEFT OUTER JOIN vwSOMaster SO 
    ON TH.COMP_CODE=SO.COMP_CODE AND TH.REF_NO=SO.SONO WHERE ST.DB_CD IN ('DNN') AND ST.DI<>'I' AND ISNULL(TH.INV_NO,'')=''
    AND ST.COMP_CODE='01' AND TH.TRN_DATE BETWEEN '${req.params.startdate}' AND '${req.params.enddate}' 
    UNION ALL SELECT TR.TRN_NO, TR.TRN_DATE, TH.INV_NO,  TR.CURR_RATE,ST.PCODE LINE_PCODE, ST.DESCRIPTION LINE_DESCRIPTION,  
    U.UNIT_DESCRIPTION LINE_UNIT_DESCRIPTION, ISNULL(ST.TOTALQUANTITY,0) LINE_QTY, ST.NETAMOUNT*(-1) 
    LINE_NET_AMT, ST.NETAMOUNT/(CASE WHEN ISNULL(ST.TOTALQUANTITY,0)>0 THEN ST.TOTALQUANTITY ELSE 1 END) UNITCOSTPRICE,
    1 QTY_PER_BASE_UNIT,0 LINE_DISCOUNT_FROM_HEADER FROM TRAN_DETAILS ST JOIN vwTranHead TR ON ST.COMP_CODE=TR.COMP_CODE
    AND ST.DB_CD=TR.DB_CD AND ST.TRN_NO=TR.TRN_NO JOIN vwTranHead TH ON TH.COMP_CODE=TR.COMP_CODE AND TH.DB_CD='DNN' AND
    TH.TRN_NO=TR.REF_NO LEFT OUTER JOIN LOCATION L ON ST.COMP_CODE=L.COMP_CODE AND ST.LOCATIONID=L.LOCATIONID 
    LEFT OUTER JOIN UNIT U ON ST.UNIT_CODE=U.UNIT_CODE LEFT OUTER JOIN vwSOMaster SO ON TH.COMP_CODE=SO.COMP_CODE AND 
    TH.REF_NO=SO.SONO WHERE ST.DB_CD IN ('DRN') AND ST.DI<>'I' AND ISNULL(TH.INV_NO,'')=''  AND ST.COMP_CODE='01'  
    AND TH.TRN_DATE BETWEEN '${req.params.startdate}' AND '${req.params.enddate}'
     `;

    

    console.log(queryStr);

    request.query(queryStr, function (err, recordset) {
        if(err)
        {
            console.log(err);
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

exports.getPayMentType = (req, res) =>
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM PMTTYPE ORDER BY SLNO`;
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






