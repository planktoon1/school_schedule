"use strict";

// INITIALIZATION
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const config = require('./config');
const path = require('path');

const app = express();

app.use(express.json());            //Parse incomming json requests to js objects
app.use(morgan('tiny'));            //Logs every request
app.use(express.static(path.join('public', 'build')));  //Serve static files from public folder
app.use(session({
    secret: 'hemmelig', //note: weak encrypt key 
    saveUninitialized: true, 
    resave: true
}));

// ROUTES FOR THE APP
/*
const adminRouter = require('./routes/admin'); //TODO
const produktRouter = require('./routes/api/produkter'); //TODO
app.use('/api/produkter', produktRouter);
app.use('/admin', adminRouter);
*/

// START THE SERVER
//use the herouko port if we're deploying there. if not: use local port.
const port = process.env.PORT || config.localPort; 
app.listen(port);
console.log('Listening on port ' + port + ' ...');

module.exports = app;
