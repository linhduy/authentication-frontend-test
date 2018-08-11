var express = require('express');
var path = require('path');
var app = express();
// app.use(express.static(__dirname + '/'));
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(process.env.PORT || 8081);