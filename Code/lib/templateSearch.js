const fs = require('fs');
const mysql = require('sync-mysql');
var con = new mysql({
    host: "localhost",
    user: "root",
    password: "us040905",
    database: "imd"
});

const templateSearchBox = require('./templateSearchBox');

module.exports = {
    getPage: (lang, word) => {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>MathDict</title>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge; chrome=1">
                <meta name="description" content="Online math dictionary for international students">
                <meta name="keywords" content="math, mathematics, dictionary, translator, elementary">
                <meta name="author" content="Justin T. Park">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
                <!-- Bootstrap -->
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

                <!-- Google Fonts -->
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
            </head>
            <body>
                ${header()}
                ${body(lang, word)}
            </body>
            </html>
        `;
    }
}

//header - menu bar, logo, about us
const header = () => {
    let css = fs.readFileSync('./style/header.css').toString();
    let js = fs.readFileSync('./style/header.js').toString();
    let logo = "";
    return `
        <style>${css}</style>
        <nav class='navbar'>
        <div class='navbar_container'>
            <div class='navbar_logo'>
            </div>
            <div class='navbar_login'>
            </div>
        </div>
        </nav>
        <script>${js}</script>
    `;
}


//body - search bar, result
const body = (lang, word) => {
    let css = fs.readFileSync('./style/bodySearch.css').toString();
    let js = fs.readFileSync('./style/bodySearch.js').toString();

    //search box
    var search = templateSearchBox.getPage();

    var result = ``;
    var wordA = con.query(`Select id from en WHERE word=${'"'+word+'"'}`)[0];
    var wordB = con.query(`Select id from ${lang} WHERE word=${'"'+word+'"'}`)[0];

    if(wordB === undefined && wordA === undefined){
        result += `
            <h3>Word Not Found</h3>
        `;
    }else{
        if(wordB === undefined) wordId = wordA.id;
        else wordId = wordB.id
        var dataA = con.query(`Select * from en WHERE id=${'"'+wordId+'"'}`)[0];
        var dataB = con.query(`Select * from ${lang} WHERE id=${'"'+wordId+'"'}`)[0];
        var synonym = (dataA.synonym === null && dataB.synonym === null) ? `` : `
            <div class='synonym'>
                ${dataA.synonym}
                ${dataB.synonym}
            </div>   
        `; 
        var example = (dataA.example === null && dataB.example === null) ? `` : `
            <div class='example'>
                ${dataA.example}
                <div class='lineHorizontal'></div>
                ${dataB.example}
            </div>   
        `; 
        var reference = (dataA.reference === null && dataB.reference === null) ? `` : `
            <div class='reference'>
                ${dataA.reference}
                ${dataB.reference}
            </div>   
        `;

        result += `
            <div class='word'>
                ${dataA.word}
                <br>
                ${dataB.word}
            </div>
            ${synonym}
            <div class='description'>
                <p>${dataA.description}</p>
                <p>${dataB.description}</p>
            </div>
            ${example}
            ${reference}
            <div class='info'>
            </div>
        `;
    }

    return `
        <style>${css}</style>
        <section class='body'>
            ${search}
            <div class='result_container'>
                ${result}
            </div>
        </section>
        <script>${js}</script>
    `;
}

//footer - about us, contact
//const footer = 