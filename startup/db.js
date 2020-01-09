const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/testtask', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.log('Error:', err));
};