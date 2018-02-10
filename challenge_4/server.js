const express = require('express');
path = require('path');

const app = express();

app.use('/node_modules', /*(req, res, next) => {console.log('hi'); next();},*/ express.static('./node_modules'));
app.use(express.static('./client/dist'));

app.listen(process.env.PORT || 1738);
