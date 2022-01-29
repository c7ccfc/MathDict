const btn = document.getElementById("search_btn");
btn.addEventListener("click", () => {
    var inpWord = document.getElementById("search_word").value;
    var inpLang = document.getElementById('search_lang').value;
    window.location.href = `../../search/${inpLang}/${inpWord}`;
})
