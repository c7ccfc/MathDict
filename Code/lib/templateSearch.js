const fs = require('fs');
const mysql = require('sync-mysql');
var con = new mysql({
    host: "localhost",
    user: "root",
    password: "us040905",
    database: "imd"
});

module.exports = {
    getPage: (lang, id) => {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>International Mathematics Dictionary</title>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge; chrome=1">
                <meta name="description" content="Online math dictionary for international students">
                <meta name="keywords" content="math, mathematics, dictionary, translator, elementary">
                <meta name="author" content="Justin T. Park">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
                <!-- Google Fonts -->
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
            </head>
            <body>
                ${header()}
                ${body(lang, id)}
            </body>
            </html>
        `;
    }
}

//header - menu bar, logo, about us
const header = () => {
    let css = fs.readFileSync('./style/head.css').toString();
    let js = fs.readFileSync('./style/head.js').toString();
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
const body = (lang, id) => {
    let css = fs.readFileSync('./style/bodySearch.css').toString();
    let js = fs.readFileSync('./style/bodySearch.js').toString();

    const langs = JSON.parse(fs.readFileSync('./data/language.json'));
    var option = ``;
    for(let i = 0; i < Object.keys(langs).length; i++) {
        if(Object.keys(langs)[i] === lang) {
            option += `<option value='${Object.keys(langs)[i]}' selected>${Object.values(langs)[i]}</option>`;
        } else {
            option += `<option value='${Object.keys(langs)[i]}'>${Object.values(langs)[i]}</option>`;
        }
    }

    var dataA = con.query(`Select * from en WHERE id=${'"'+id+'"'}`)[0];
    var dataB = con.query(`Select * from ${lang} WHERE id=${'"'+id+'"'}`)[0];
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

    return `
        <style>${css}</style>
        <section class='body'>
            <div class='search_box'>
                <label for='search_lang'></label>
                <select id='search_lang'>
                    ${option}
                </select>
                <input
                    type='text'
                    placeholder='Type the word here...'
                    id='search_word'
                />
                <button id="search_btn">Search</button>
            </div>
            <div class='result_container'>
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
            </div>
        </section>
        <script>${js}</script>
    `;
}

//footer - about us, contact
//const footer = 