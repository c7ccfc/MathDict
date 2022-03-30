const fs = require('fs');
module.exports = {
    getPage: () => {
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
}