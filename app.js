
// Modules 
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');

// Routing
const DataBase = require('./database/database');
const adminRouter = require('./routes/adminRoutes')
const memberRouter = require('./routes/memberRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const searchRouter = require('./routes/searchRoutes');

// Server Setup
const app = express();

// View-engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Express Methods
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

// Route prefixes 
app.use('/', memberRouter);
app.use('/admin', adminRouter);
app.use('/booking', bookingRouter);
app.use('/search', searchRouter); 

app.use((req, res) => {
    res.status(404).render('pages/404', {
        member:true, 
        admin:true,
        userType: "member",
    })
});

DataBase.connect(function () {  // cb
    app.listen(3000);
});
