const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', function(req, res){
    var input_id = ['1','2','3'];
    var input_la = ['a','b','c'];
    var html = `
        <a href="/${input_la[0]}/${input_id[0]}">page1</a><br>
        <a href="/${input_la[1]}/${input_id[1]}">page2</a><br>
        <a href="/${input_la[2]}/${input_id[2]}">page3</a><br>`
        res.send(html);
});

app.get('/:la/:id', (req, res) => {
    var filtered = req.params.id
    console.log(req.params.id);
    console.log(req.params.la);
    var html = `
    <h1>${filtered}</h1>
    <a href="/">home</a>
    `
    res.send(html);
});

app.listen(port, () => console.log('listening'))