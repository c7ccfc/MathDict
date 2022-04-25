const fs = require('fs');
module.exports = {
    getPage: () => {
        let css = fs.readFileSync('./style/header.css').toString();
        let js = fs.readFileSync('./style/header.js').toString();
        
        return `
            <style>${css}</style>
            <div class="header container-fluid">
            <div class='col-xl-7 col-lg-9 col-md-11 mx-auto'>
            <nav class="navbar navbar-expand-md navbar-light bg-transparent">
                <a class="logo" href="#">
                    <div><img src="/img/logo.png" width="232" height="32" alt=""></div>
                    <h1 class="name">World Mathematics Dictionary - MathDict</h1>
                </a>

                <div class="items collapse navbar-collapse justify-content-end" id="navbarNav">
                    <div class="navbar-nav">
                    <a class="nav-item nav-link disabled" href="#">Story</a>
                    <a class="nav-item nav-link disabled" href="#">Game</a>
                    <a class="nav-item nav-link disabled" href="#">Glossary</a>
                    <a class="nav-item nav-link" href="#">About</a>
                    </div>
                </div>
                
                <div class="hamburger-menu">
                    <div class="hamburger-button">
                        <div class="line-1"></div>
                        <div class="line-2"></div>
                        <div class="line-3"></div>
                    </div>
                    <ul class="menu-list">
                        <li class="menu-item">
                            <a href="#" class="menu-link">About</a>
                        </li>
                        <li class="menu-item">
                            <a href="#" class="menu-link">Glossary</a>
                        </li>
                        <li class="menu-item">
                            <a href="#" class="menu-link">Game</a>
                        </li>
                        <li class="menu-item">
                            <a href="#" class="menu-link">Story</a>
                        </li>
                    </ul>
                </div>
            </nav>
            </div>
            </div>
                
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
            <script>${js}</script>
        `;
    }
}