const fs = require('fs');

module.exports = {
    getPage: (lang, id) => {
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
                
                <!-- FontAwesome -->
                <script src="https://kit.fontawesome.com/2997a78421.js" crossorigin="anonymous"></script>

                <!-- Google Fonts -->
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet">
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
    return `
        <style>${css}</style>
        <div class="header container-fluid">
        <div class='col-md-7 mx-auto'>
        <nav class="navbar navbar-expand-md navbar-light bg-transparent">
            <a class="logo navbar-brand" href="#">
                <div><img src="/img/logo.png" width="232" height="32" alt=""></div>
                <h1>World Mathematics Dictionary - MathDict</h1>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                <a class="nav-item nav-link disabled" href="#">Story</a>
                <a class="nav-item nav-link disabled" href="#">Game</a>
                <a class="nav-item nav-link disabled" href="#">Glossary</a>
                <a class="nav-item nav-link" href="#">About</a>
                </div>
            </div>
        </nav>
        </div>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        <script>${js}</script>
    `;
}

//body - search bar, result
const body = (lang, id) => {
    let css = fs.readFileSync('./style/bodyIndex.css').toString();
    let js = fs.readFileSync('./style/bodyIndex.js').toString();

    //language selection options
    const langs = JSON.parse(fs.readFileSync('./data/language.json'));
    var option = `<option value='' hidden>Language</option>`;
    for(let i = 0; i < Object.keys(langs).length; i++) {
        option += `<option value='${Object.keys(langs)[i]}'>${Object.values(langs)[i]}</option>`;
    }

    return `
        <style>${css}</style>
        <div class='col-md-7 mx-auto'>
            <div class='search_box'>
            <div class='search_upper'>
                <input
                    type='text'
                    placeholder='Search words...'
                    id='search_word'
                />
                <button id="search_btn"><i class="fas fa-search fa-2x"></i></button>
            </div>
            <div class='search_lower'>
                <select id='search_lang_def'><option hidden>English</option></select>
                <i class="fas fa-exchange-alt fa-2x"></i>
                <span class='lang_select'>
                <label for='search_lang'></label>
                <select id='search_lang'>
                    ${option}
                </select>
                </span>
            </div>
            </div>
        </div>
        <script>${js}</script>
    `;
}

//footer - about us, contact
//const footer = 