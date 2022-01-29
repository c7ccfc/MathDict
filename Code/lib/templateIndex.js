const fs = require('fs');

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
                <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap&effect=font-effect-3d" rel="stylesheet">
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
                <a href='localhost:3000/'>
                    MathDict
                </a>
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
    let css = fs.readFileSync('./style/bodyIndex.css').toString();
    let js = fs.readFileSync('./style/bodyIndex.js').toString();

    //language selection options
    const langs = JSON.parse(fs.readFileSync('./data/language.json'));
    var option = `<option value='' hidden>Select Language</option>`;
    for(let i = 0; i < Object.keys(langs).length; i++) {
        option += `<option value='${Object.keys(langs)[i]}'>${Object.values(langs)[i]}</option>`;
    }

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
        </section>
        <script>${js}</script>
    `;
}

//footer - about us, contact
//const footer = 