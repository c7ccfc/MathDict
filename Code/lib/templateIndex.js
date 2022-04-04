const fs = require('fs');
const mysql = require('sync-mysql');
var con = new mysql({
    host: "localhost",
    user: "root",
    password: "us040905",
    database: "imd"
});

const templateSearchBox = require('./templateSearchBox');
const templateHeader = require('./templateHeader');

module.exports = {
    getPage: () => {
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
    return `
        ${search}
    `;
}

//footer - about us, contact
//const footer = 