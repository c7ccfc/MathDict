const http = require('http');
const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

const templateIndex = require('./lib/templateIndex')
const templateSearch = require('./lib/templateSearch');
const { fstat } = require('fs');

app.get('/', (req, res) => {
    let page = templateIndex.getPage();
    res.writeHead(200);
    res.end(page);
});

app.get('/search/:lang/:word', (req, res) => {
    let page = templateSearch.getPage(req.params.lang, req.params.word);
    res.writeHead(200);
    res.end(page);
});

app.get('/about', (req, res) => {
    //about us
});

//login

//create

//images
app.get('/img/:name', function(req, res) {
    fs.readFile(`image/${req.params.name}`, function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
    });
});

app.listen(port, () => console.log(`app listening at http://localhost:${port}`));
