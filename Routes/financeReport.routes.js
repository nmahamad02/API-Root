module.exports = (app) => {
    const FinanceContrllr = require('../Controllers/financeReport.controllers.js');

    // GET MIS REPORT 
    app.get('/api/FinanceReport/getMISReport/:fromDate/:toDate/:strCompcode/:strYear', FinanceContrllr.getMISReport);
    
    //GET BALANCE SHEET REPORT
    app.get('/api/FinanceReport/getBalanceSheet/:prvfromDate/:prvToDate/:fromDate/:toDate/:strCompcode/:strYear', FinanceContrllr.getBalanceSheetReport);
   
    //GET TRAIL BALANCE SUMMARY REPORT
    app.get('/api/FinanceReport/getTrailBalanceSummary/:fromDate/:toDate/:strCompCode/:strYear', FinanceContrllr.getTrailBalanceSummary);
    
};