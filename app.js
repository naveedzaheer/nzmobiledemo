// ----------------------------------------------------------------------------
// Copyright (c) 2015 Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------

// This is a base-level Azure Mobile App SDK.
var express = require('express'),
    azureMobileApps = require('azure-mobile-apps');

// Set up a standard Express app
var app = express();

// var router = express.Router();

// // router.get('/category/:category', function (req, res, next) {
// //         console.log("started setup api/note routing");
// //         // req.azureMobile.tables('todoitem')
// //         //     .where({ category: req.params.category })
// //         //     .read()
// //         //     .then(function (results) { return res.json(results); })
// //         //     .catch(next); // it is important to catch any errors and log them

// //         res.send(200, "Hello");
// //         console.log("end setup api/note routing");

// //         next();
// //     });

// router.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });   
// });


// app.use("/api", router);

// If you are producing a combined Web + Mobile app, then you should handle
// anything like logging, registering middleware, etc. here

// Configuration of the Azure Mobile Apps can be done via an object, the
// environment or an auxiliary file.  For more information, see
// http://azure.github.io/azure-mobile-apps-node/global.html#configuration
var mobileApp = azureMobileApps({
    // Explicitly enable the Azure Mobile Apps home page
    homePage: true,
    // Explicitly enable swagger support. UI support is enabled by
    // installing the swagger-ui npm module.
    swagger: true,
    // App will use MS_SqliteFilename or MS_TableConnectionString to choose the SQLite or SQL data provider
    data: {
        dynamicSchema: true
    }
});

// Import the files from the tables directory to configure the /tables endpoint
mobileApp.tables.import('./tables');

// Import the files from the api directory to configure the /api endpoint
mobileApp.api.import('./api');

// Initialize the database before listening for incoming requests
// The tables.initialize() method does the initialization asynchronously
// and returns a Promise.
mobileApp.tables.initialize()
    .then(function () {
        app.use(mobileApp);    // Register the Azure Mobile Apps middleware
        app.listen(process.env.PORT || 3000);   // Listen for requests
    });
