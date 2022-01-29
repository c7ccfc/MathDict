const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const templateIndex = require('./lib/templateIndex')
const templateSearch = require('./lib/templateSearch')

app.get('/', (req, res) => {
    let page = templateIndex.getPage();
    res.writeHead(200);
    res.end(page);
});

app.get('/search/:lang/:id', (req, res) => {
    let page = templateSearch.getPage(req.params.lang, req.params.id);
    res.writeHead(200);
    res.end(page);
});

app.get('/about', (req, res) => {
    //about us
});

//login

//create

app.listen(port, () => console.log(`app listening at http://localhost:${port}`));
