const menuIcon = document.querySelector('.hamburger-button');
const hamMenu = document.querySelector('.hamburger-menu')

menuIcon.addEventListener('click', () => {
    hamMenu.classList.toggle('change');
});