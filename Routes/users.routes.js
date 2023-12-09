module.exports = (app) => {
    const UsrContrllr = require('../Controllers/users.controllers.js');

    // GET REQUEST
    app.get('/api/users', UsrContrllr.getAllUsers);

    // GET PARTICULAR USER
    app.get('/api/users/:name', UsrContrllr.getUser);

    //LOGIN TO ADUSER
    app.get('/api/getUserLogin/:usercode', UsrContrllr.getUserLogin);
        
    //3. GET USER ROLES
    app.get('/api/users/roles/:userClass', UsrContrllr.getUserRoles);

    //4. POST NEW USER
    app.post('/api/users/new', UsrContrllr.addNewUser);
    
    //5. PUT NEW PASSWORD
    app.post('/api/user/changePassword', UsrContrllr.updateUserPassword);

    //5. UPDATE USER
    app.post('/api/user/updateUser', UsrContrllr.updateUser);

    app.get('/api/getAllIncomeandExpenseDetails/:startdate/:enddate', UsrContrllr.getAllIncomeandExpenseDetails);

    app.get('/api/getBatchIncomeandExpenseDetails/:startdate/:enddate/:bathsrl', UsrContrllr.getBatchIncomeandExpenseDetails);

    app.get('/api/getStockSummaryReport/:startdate/:enddate/:compcode/:stryear', UsrContrllr.getStockSummaryReport);

    app.get('/api/getSalesAndProfitByCustomer/:startdate/:enddate', UsrContrllr.getSalesAndProfitByCustomer);

    app.get('/api/getBatchSerial', UsrContrllr.getBatchSerial);

    //GET ALL PAYMENT DETIALS 
    app.get('/api/getPayMentType', UsrContrllr.getPayMentType);

};
