module.exports = (app) => {
    const ReceivableContrllr = require('../Controllers/receivableReport.controllers');

    //Get Debtors Ageing Report
    app.get('/api/ReceivableReport/getDebtorsAgeing/:fromDate/:toDate/:strcompCode/:stryear', ReceivableContrllr.getDebtorsAgeing);
    
};