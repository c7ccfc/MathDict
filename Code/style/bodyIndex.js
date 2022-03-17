

function search(){
    var inpWord = document.getElementById("search_word").value.toLowerCase();
    var inpLang = document.getElementById('search_lang').value;
    if(inpLang === '') inpLang = `en`;

    // var enWord = con.query(`Select id from en WHERE word=${'"'+inpWord+'"'}`)[0];
    // var langWord = con.query(`Select id from ${inpLang} WHERE word=${'"'+inpWord+'"'}`)[0];
    // if(!langWord && !enWord){
    //     window.location.href = `search/notfound`;
    // }else{
        // if(!enWord) enWord = langWord.id;
        // else enWord = enWord.id
        // window.location.href = `search/${inpLang}/${inpWord}`;
    // }
    window.location.href = `search/${inpLang}/${inpWord}`;
}

const btn = document.getElementById("search_btn");
btn.addEventListener("click", () => {
    search();
})

window.addEventListener("keydown", (e) => {
    if(e.key == "Enter"){search();}
});