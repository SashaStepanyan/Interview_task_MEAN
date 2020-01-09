const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Comming soon...');
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));