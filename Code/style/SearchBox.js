function search(){
    var inpWord = document.getElementById("search_word").value.toLowerCase();
    var inpLang = document.getElementById('search_lang').value;
    if(inpLang === '') inpLang = `en`;
    window.location.href = `search/${inpLang}/${inpWord}`;
}

const btn = document.getElementById("search_btn");
btn.addEventListener("click", () => {
    search();
})

window.addEventListener("keydown", (e) => {
    if(e.key == "Enter"){search();}
});