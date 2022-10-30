const fs = require('fs');
const mysql = require('sync-mysql');
var con = new mysql({
    host: "mathdict.net",
    user: "mathdict",
    password: "Math2022!",
    database: "mathdict",
    port: '3306'
});

const templateSearchBox = require('./templateSearchBox');
const templateHeader = require('./templateHeader');

module.exports = {
    getPage: (lang, word) => {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>MathDict - ${word}</title>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge; chrome=1">
                <meta name="description" content="Online mathematics dictionary for international students">
                <meta name="keywords" content="math, mathematics, dictionary, translator, elementary">
                <meta name="author" content="Justin T. Park">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
                <!-- Bootstrap -->
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
                
                <!-- FontAwesome -->
                <script src="https://kit.fontawesome.com/2997a78421.js" crossorigin="anonymous"></script>
                
                <!-- Google Fonts -->
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet">
            </head>
            <body>
                ${header}
                ${body(lang, word)}
            </body>
            </html>
        `;
    }
}

//header - menu bar, logo, about us
const header = templateHeader.getPage();

//body - search bar, result
const body = (lang, word) => {
    let css = fs.readFileSync('/home/hosting_users/mathdict/apps/mathdict_mathdict/style/bodySearch.css').toString();
    let js = fs.readFileSync('/home/hosting_users/mathdict/apps/mathdict_mathdict/style/bodySearch.js').toString();

    //search box
    var search = templateSearchBox.getPage(lang);

    //get data
    var result = ``;
    var wordA = con.query(`Select id from en WHERE word=${'"'+word+'"'}`)[0];
    var wordB = con.query(`Select id from ${lang} WHERE word=${'"'+word+'"'}`)[0];

    if(wordB === undefined && wordA === undefined){
        result += `
            <h3>Word Not Found</h3>
        `;
    }else{
        if(wordB === undefined) wordId = wordA.id;
        else wordId = wordB.id;
        var dataA = con.query(`Select * from en WHERE id=${'"'+wordId+'"'}`)[0];
        if(con.query(`Select word from ${lang} WHERE word=${'"'+wordId+'"'}`)[0] === null) lang = 'en';
        if(lang === 'en') wordId = 'null';
        var dataB = con.query(`Select * from ${lang} WHERE id=${'"'+wordId+'"'}`)[0];

        //word
        var word = `
        <div class='word'>
            <span class='A'>${dataA.word}</span>
            <br>
            <span class='B'>${dataB.word}</span>
        </div>
        `;

        //definition
        if(!dataA.definition) defA = ''; else defA = dataA.definition;
        if(!dataB.definition) defB = ''; else defB = dataB.definition;
        var definition = (!dataA.definition && !dataB.definition) ? `` : `
            <div class='definition'>
                <div class='divider'>
                    <span class='title'>Definition</span>
                </div>
                <p>${defA}</p>
                <p>${defB}</p>
            </div>
        `;

        //synonym
        var synonym = (!dataA.synonym && !dataB.synonym) ? `` : `
            <div class='synonym'>
                ${dataA.synonym}
                ${dataB.synonym}
            </div>   
        `; 

        //example
        var example = (!dataA.example && !dataB.example) ? `` : `
            <div class='example'>
                <hr class="divider">
                ${dataA.example}
                <div class='lineHorizontal'></div>
                ${dataB.example}
            </div>   
        `; 

        //reference
        var reference = (!dataA.reference && !dataB.reference) ? `` : `
            <div class='reference'>
                <hr class="divider">
                ${dataA.reference}
                ${dataB.reference}
            </div>   
        `;
        
        //result
        result += `
            <div class='col-md-7 col-11 mx-auto'>
                ${word}
                ${synonym}
                ${definition}
                ${example}
                ${reference}
                <div class='info'>
                </div>
            </div>
        `;
    }

    return `
        <style>${css}</style>
        <section class='body'>
            ${search}
            ${result}
        </section>
        <script>${js}</script>
    `;
}

//footer - about us, contact
//const footer = 