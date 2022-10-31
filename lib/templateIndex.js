const fs = require('fs');
const mysql = require('sync-mysql');
var con = new mysql({
    //
});

const templateSearchBox = require('./templateSearchBox');
const templateHeader = require('./templateHeader');

module.exports = {
    getPage: () => {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>MathDict - Online Math Dictionary for Students</title>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge; chrome=1">
                <meta name="description" content="Online math dictionary for international students">
                <meta name="keywords" content="math, mathematics, dictionary, translator, elementary, student">
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
                ${body()}
            </body>
            </html>
        `;
    }
}

//header - menu bar, logo, about us
const header = templateHeader.getPage();


const body = () => {
    var search = templateSearchBox.getPage();

    var intro = `
        <div class='col-md-7 col-11 mx-auto'>
            <div class="intro">
                <H3>What is MathDict?</H3>
                <p>MathDict is a non-profit project to help elementary of middle school students, especially ESL (English as a Second Language) students, all around the world.</p>
                
                <H3>Why should I use MathDict?</H3>
                <p>MathDict is designed to settle the inconvenience due to the lack of information and support from current online math dictionaries and low accessability of printed dictionary. Therefore, MathDict will provide comprehensive materials, such as definition, synonyms, examples, and external resources, for numerous words in various languages.</p>

                <H3>How can I support MathDict?</H3>
                <p></p>
            </div>
        </div>
    `;

    return `
        ${search}
        ${intro}
    `;
}

//footer - about us, contact
//const footer = 