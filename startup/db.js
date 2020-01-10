const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://ec75cabd2222a481aeeb41859887d188:123123@9a.mongo.evennode.com:27017/ec75cabd2222a481aeeb41859887d188', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.log('Error:', err));
};