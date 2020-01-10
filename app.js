const express = require('express');
const app = express();
const path = require('path');

require('./startup/routes')(app);
require('./startup/db')();


app.use(express.static('public/crud'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/crud/index.html'));
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));