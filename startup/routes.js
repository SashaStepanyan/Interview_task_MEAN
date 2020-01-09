const cors = require('cors');
const express = require('express');
const users = require('../routes/users');


module.exports = function (app) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
 
    //Routes
    app.use('/api/users', users);
};